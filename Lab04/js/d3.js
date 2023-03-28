async function main() {
    const original_dataset = await d3.csv('./src/coding_results_11212021.csv')
    // ImageName - pixel
    // Image type: count coder1-encodings, coder2-encodings, x-axis, n=11
    // Year - y-axis
    // Consistency: - color

    const dataset = []
    const typeList = []  // x-axis, n=11
    const yearList = []  // y-axis, yearRange
    const coderList = [] 
    original_dataset.forEach(function(d, i) {
        id = d["ImageName"];
        type1 = d["coder1-encodings"];
        type2 = d["coder2-encodings"];
        coder1 = d["Coders"].split("; ")[0];
        coder2 = d["Coders"].split("; ")[1];
        year = Number(d["Year"]);
        if (!typeList.includes(type1)) typeList.push(type1);
        if (!typeList.includes(type2)) typeList.push(type2);
        if (!yearList.includes(year)) yearList.push(year);
        if (!coderList.includes(coder1)) coderList.push(coder1);
        if (!coderList.includes(coder2)) coderList.push(coder2);
        if (type1 == type2) {
            consistency = 1;
        } else {
            consistency = 0;
        }
        dataset.push({id: id, coder: coder1, type: type1, year: year, consistency: consistency})
        dataset.push({id: id, coder: coder2, type: type2, year: year, consistency: consistency})
    })
    yearRange = [Math.min.apply(null, yearList), Math.max.apply(null, yearList)]
    const typeMap = new Map();
    typeList.forEach(function(d,i) {typeMap.set(d, i)})
    console.log(coderList)


    // calculate axis
    // for each coder, for each type, if year not in list, reate and +1
    const axisMap = new Map();  // {coder: [num for each type]}
    for (coder of coderList) {
        tmpList = new Array(typeList.length).fill(0);  // [num for each type]
        for (type of typeList) {
            tmpMap = new Map();  // {year: num}
            dataset.forEach(function(d, i) {
                if (d.coder == coder && d.type == type) {
                    if (tmpMap.has(d.year)) {
                        tmp = tmpMap.get(d.year) + 1;
                        tmpMap.set(d.year, tmp);
                    } else {
                        tmpMap.set(d.year, 1);
                    }
                }
            })
            maxOfYears = Math.max(...tmpMap.values())
            tmpList[typeMap.get(type)] = maxOfYears
        }
        axisMap.set(coder, tmpList)
    }


    // svg
    const margin = {top: 30, right: 30, bottom: 30, left: 30},
        width = 950 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

    const svg = d3.select("#wrapper")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);





    // just before click
    thisCoder = "TI";

    svg.selectAll("*").remove();


    // x-axis:
    indexNow = -1
    indexTick = [];
    for (type of typeList) {
        indexNow = indexNow + axisMap.get(thisCoder)[typeMap.get(type)]
        indexTick.push(indexNow);
    }
    const min_data = 0, max_data = axisMap.get(thisCoder).reduce((a, b) => a + b, 0);
    xDomain = Array.from(Array(max_data+5), (d, i) => { return i; });
    const xScale = d3.scaleBand()  //scaleBand
        .domain( xDomain )  // [min_data, max_data]  xDomain
        .range([0, width]);
    const xAxisGenerator = d3.axisBottom(xScale)  // .ticks(3)
        .tickValues(indexTick)
        .tickFormat((d,i) => typeList[i] + ": " + String(axisMap.get(thisCoder)[typeMap.get(typeList[i])]))
        // .attr("transform",`translate(${0},${0})`)
        .tickSize(-(height - 70));
    svg.append("g")
        .attr("transform",`translate(${-xScale.bandwidth()/2},${height - 70})`)
        .call(xAxisGenerator)
        .selectAll(".tick text")
            .attr("font-size","14")
            .attr('transform', 'rotate(65) translate(30, 0)');

    // y-axis:
    yearTick = Array.from(Array(yearList.length), (d, i) => { return i+1; });
    console.log( yearList, yearRange, yearTick )
    const yScale = d3.scaleBand()
        .domain(yearTick)  // [0,yearList.length]
        .range([ height-70, 0])
        // .padding(0.01);
    const yAxisGenerator = d3.axisLeft(yScale)  // .ticks(3)
        .tickValues(yearTick)
        .tickFormat((d,i) => yearList[i])
        // .tickSize(0);
    svg.append("g")
        // .attr("transform",`translate(${0},${-70})`)
        .call(yAxisGenerator);


    // draw graph
    // dataset.push({id: id, coder: coder2, type: type2, year: year, consistency: consistency})
    // y: for each year, count each type has how many in/consistent; then {y: yearList.indexOf(d.year)); x: }
    datafinal = new Map();  // {"year;;type": [con, incon]}
    dataset.forEach(function(d, i) {
        if (d.coder == thisCoder) {
            key = d.year + ";;" + d.type
            if (datafinal.has(key)) {
                if (d.consistency == 1) {
                    tmp0 = datafinal.get(key)[0] + 1;
                    tmp1 = datafinal.get(key)[1];
                    datafinal.set(key, [tmp0, tmp1]);
                } else {
                    tmp0 = datafinal.get(key)[0];
                    tmp1 = datafinal.get(key)[1] + 1;
                    datafinal.set(key, [tmp0, tmp1]);
                }
            } else {
                if (d.consistency == 1) {
                    datafinal.set(key, [1, 0]);
                } else {
                    datafinal.set(key, [0, 1]);
                }
            }
        }
    })
    // console.log(datafinal)

    dataDraw = [];
    datafinal.forEach(function(v,k,w) {
        y = yearList.indexOf(Number(k.split(";;")[0]));
        t = k.split(";;")[1];
        con = v[0];
        incon = v[1];
        if (typeMap.get(t) == 0) { start = 0 } else { start = indexTick[typeMap.get(t)-1]}
        while (con != 0) {
            dataDraw.push({y: y, x: start, con: 1})
            start = start+1;
            con = con-1;
        }
        while (incon != 0) {
            dataDraw.push({y: y, x: start, con: 0})
            start = start+1;
            incon = incon-1;
        }
    })
    console.log(dataDraw)

    const colorBox = ['#D51E24', '#282347']  // red, green D51E24 282347 1f2158
    svg.selectAll()
        .data(dataDraw)
        .enter()
        .append("rect")
            .attr("x", function(d) { return xScale(d.x); })
            .attr("y", function(d) { return yScale(d.y); })
            .attr("width", xScale.bandwidth() )
            .attr("height", yScale.bandwidth() )
            .style("fill", function(d) { return colorBox[d.con]} )

















    d3.selectAll(".button").on("click", function() {

        thisCoder = this.id;

        svg.selectAll("*").remove();


        // x-axis:
        indexNow = -1
        indexTick = [];
        for (type of typeList) {
            indexNow = indexNow + axisMap.get(thisCoder)[typeMap.get(type)]
            indexTick.push(indexNow);
        }
        const min_data = 0, max_data = axisMap.get(thisCoder).reduce((a, b) => a + b, 0);
        xDomain = Array.from(Array(max_data+5), (d, i) => { return i; });
        const xScale = d3.scaleBand()  //scaleBand
            .domain( xDomain )  // [min_data, max_data]  xDomain
            .range([0, width]);
        const xAxisGenerator = d3.axisBottom(xScale)  // .ticks(3)
            .tickValues(indexTick)
            .tickFormat((d,i) => typeList[i] + ": " + String(axisMap.get(thisCoder)[typeMap.get(typeList[i])]))
            // .attr("transform",`translate(${0},${0})`)
            .tickSize(-(height - 70));
        svg.append("g")
            .attr("transform",`translate(${-xScale.bandwidth()/2},${height - 70})`)
            .call(xAxisGenerator)
            .selectAll(".tick text")
                .attr("font-size","14")
                .attr('transform', 'rotate(65) translate(30, 0)');

        // y-axis:
        yearTick = Array.from(Array(yearList.length), (d, i) => { return i+1; });
        console.log( yearList, yearRange, yearTick )
        const yScale = d3.scaleBand()
            .domain(yearTick)  // [0,yearList.length]
            .range([ height-70, 0])
            // .padding(0.01);
        const yAxisGenerator = d3.axisLeft(yScale)  // .ticks(3)
            .tickValues(yearTick)
            .tickFormat((d,i) => yearList[i])
            // .tickSize(0);
        svg.append("g")
            // .attr("transform",`translate(${0},${-70})`)
            .call(yAxisGenerator);


        // draw graph
        // dataset.push({id: id, coder: coder2, type: type2, year: year, consistency: consistency})
        // y: for each year, count each type has how many in/consistent; then {y: yearList.indexOf(d.year)); x: }
        datafinal = new Map();  // {"year;;type": [con, incon]}
        dataset.forEach(function(d, i) {
            if (d.coder == thisCoder) {
                key = d.year + ";;" + d.type
                if (datafinal.has(key)) {
                    if (d.consistency == 1) {
                        tmp0 = datafinal.get(key)[0] + 1;
                        tmp1 = datafinal.get(key)[1];
                        datafinal.set(key, [tmp0, tmp1]);
                    } else {
                        tmp0 = datafinal.get(key)[0];
                        tmp1 = datafinal.get(key)[1] + 1;
                        datafinal.set(key, [tmp0, tmp1]);
                    }
                } else {
                    if (d.consistency == 1) {
                        datafinal.set(key, [1, 0]);
                    } else {
                        datafinal.set(key, [0, 1]);
                    }
                }
            }
        })
        // console.log(datafinal)

        dataDraw = [];
        datafinal.forEach(function(v,k,w) {
            y = yearList.indexOf(Number(k.split(";;")[0]));
            t = k.split(";;")[1];
            con = v[0];
            incon = v[1];
            if (typeMap.get(t) == 0) { start = 0 } else { start = indexTick[typeMap.get(t)-1]}
            while (con != 0) {
                dataDraw.push({y: y, x: start, con: 1})
                start = start+1;
                con = con-1;
            }
            while (incon != 0) {
                dataDraw.push({y: y, x: start, con: 0})
                start = start+1;
                incon = incon-1;
            }
        })
        console.log(dataDraw)

        const colorBox = ['#FF1E00', '#5D9C59']  // red, green
        svg.selectAll()
            .data(dataDraw)
            .enter()
            .append("rect")
                .attr("x", function(d) { return xScale(d.x); })
                .attr("y", function(d) { return yScale(d.y); })
                .attr("width", xScale.bandwidth() )
                .attr("height", yScale.bandwidth() )
                .style("fill", function(d) { return colorBox[d.con]} )

    })
}

main()
