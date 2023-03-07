async function main() {
    const original_dataset = await d3.csv('./data/arcos-oh-adams-39001-itemized.csv')

    // REPORTER_STATE BUYER_CITY
    // 0-30, 30-100, 100-500, 500-4k, >4k
    const dataset = []
    const map = new Map();
    original_dataset.forEach(function(d, i) {
        state = d["REPORTER_STATE"];
        city = d["BUYER_CITY"];
        key = state + "/" + city;
        // console.log(map.has(key))
        if (map.has(key)) {
            tmp = Number(map.get(key)) + 1;
            map.set(key, tmp)
        }
        else {
            map.set(key, 1);
        }
    })
    const cities = [];
    const states = [];
    for (const [key, value] of map) {
        state = key.split("/")[0]
        city = key.split("/")[1]
        if (value<31) {
            dataset.push({state: state, city: city, num: value, color: 0})
        } else if (value<100) {
            dataset.push({state: state, city: city, num: value, color: 1})
        } else if (value<500) {
            dataset.push({state: state, city: city, num: value, color: 2})
        } else if (value<4000) {
            dataset.push({state: state, city: city, num: value, color: 3})
        } else {
            dataset.push({state: state, city: city, num: value, color: 4})
        }
        if (states.includes(state) == false) {
            states.push(state)
        }
        if (cities.includes(city) == false) {
            cities.push(city)
        }
    }
    console.log(dataset) 


    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#wrapper")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);


    // Build axis:
    const x = d3.scaleBand()
        .range([ 0, width ])
        .domain(cities)
        .padding(0.01)
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))

    const y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(states)
        .padding(0.01);
    svg.append("g")
        .call(d3.axisLeft(y));


    // create a tooltip
    const tooltip = d3.select("#wrapper")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        // .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(event,d) {
        tooltip.style("opacity", 1)
    }
    const mousemove = function(event,d) {
    tooltip
        // .html("The exact value of<br>this cell is: " + d.value)
        .html("The value of this cell is: " + d.num)
        .style("left", (event.x)/2 + "px")
        .style("top", (event.y)/2 + "px")
    }
    const mouseleave = function(d) {
        tooltip.style("opacity", 0)
    }


    // // default graph
    // svg.selectAll()
    //     .data(dataset)
    //     .enter()
    //     .append("rect")
    //         .attr("x", function(d) { return x(d.city) })
    //         .attr("y", function(d) { return y(d.state) })
    //         .attr("width", x.bandwidth() )
    //         .attr("height", y.bandwidth() )
    //         // .style("fill", function(d) { return myColor(d.num)} )
    //     .on("mouseover", mouseover)
    //     .on("mousemove", mousemove)
    //     .on("mouseleave", mouseleave)

 
    d3.selectAll(".button.type1").on("click", function() {
        const text = d3.select("p")
        .text(function(d) { return "Drag dealing in USA" })
        .append("p")
        .text(function(d) { return "This is a very bad vis. I remove all the labels, set the color to all black and give it a misleading title." })
        .classed('legend_values', true);

        svg.selectAll("text").remove();
        
        svg.selectAll()
        .data(dataset)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.city) })
            .attr("y", function(d) { return y(d.state) })
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            // .style("fill", function(d) { return myColor(d.num)} )
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
    })



    d3.selectAll(".button.type2").on("click", function() {

        const interpolateSinebow = d3.scaleSequential(d3.interpolateSinebow)
            .domain([0, 7000])

        const text = d3.select("p")
        .text(function(d) { return "Drag dealing in OH" })
        .append("p")
        .text(function(d) { return "It is better then first one, but I choose the missleading color and set the wrong value range. So people can not see directly which cell has bigger number and number 7000 has almost same color as 700." })
        .append("p")
        .text(function(d) { return "x: buyer city" })
        .append("p")
        .text(function(d) { return "y: reporter state" })
        .classed('legend_values', true);

        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(cities)
            .padding(0.01)
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
        const y = d3.scaleBand()
            .range([ height, 0 ])
            .domain(states)
            .padding(0.01);
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll()
        .data(dataset)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.city) })
            .attr("y", function(d) { return y(d.state) })
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", function(d) { return interpolateSinebow(d.num)} )
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
    })



    d3.selectAll(".button.type3").on("click", function() {

        const interpolateGreens = d3.scaleSequential(d3.interpolateGreens)
        .domain([0, 7500])

        const text = d3.select("p")
        .text(function(d) { return "Drag dealing in OH" })
        .append("p")
        .text(function(d) { return "It is a better one with a good color range. People can easily figure out which cell has a bigger value. However the cell with small number show a white color and at first I use the white background which make them look same as Null cells. This address some design detail is also important for people to read the graph." })
        .append("p")
        .text(function(d) { return "x: buyer city" })
        .append("p")
        .text(function(d) { return "y: reporter state" })
        .classed('legend_values', true);

        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(cities)
            .padding(0.01)
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
        const y = d3.scaleBand()
            .range([ height, 0 ])
            .domain(states)
            .padding(0.01);
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll()
        .data(dataset)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.city) })
            .attr("y", function(d) { return y(d.state) })
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", function(d) { return interpolateGreens(d.num)} )
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
    })



    d3.selectAll(".button.type4").on("click", function() {

        // 0-30, 30-100, 100-500, 500-4k, >4k
        const interpolateGreens = d3.scaleSequential(d3.interpolateGreens)
        .domain([0, 4])

        const text = d3.select("p")
        .text(function(d) { return "Drag dealing in OH" })
        .append("p")
        .text(function(d) { return "It is better then p1-vis1 since I group the data and give it a non-linear mapping to the color sequence. I notice this dataset has a very wide range of value with unbalanced distribution. So a non-linear color mapping can make those cells more easily for people to catch its position in whole dataset." })
        .append("p")
        .text(function(d) { return "x: buyer city" })
        .append("p")
        .text(function(d) { return "y: reporter state" })
        .classed('legend_values', true);

        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(cities)
            .padding(0.01)
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
        const y = d3.scaleBand()
            .range([ height, 0 ])
            .domain(states)
            .padding(0.01);
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll()
        .data(dataset)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.city) })
            .attr("y", function(d) { return y(d.state) })
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", function(d) { return interpolateGreens(d.color)} )
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
    })


    // // old version - single button type
    // d3.selectAll(".button.type").on("click", function() {
    //     var buttonID = d3.select(this).attr("id");

    //     if (buttonID == "interpolateYlOrRd") {
    //         const interpolateYlOrRd = d3.scaleSequential(d3.interpolateYlOrRd)
    //             .domain([0, 8000])

    //         const text = d3.select("p")
    //         .text(function(d) { return "sdsas" })
    //         .classed('legend_values', true);
            
    //         const x = d3.scaleBand()
    //             .range([ 0, width ])
    //             .domain(cities)
    //             .padding(0.01)
    //         svg.append("g")
    //             .attr("transform", `translate(0, ${height})`)
    //             .call(d3.axisBottom(x))
    //         const y = d3.scaleBand()
    //             .range([ height, 0 ])
    //             .domain(states)
    //             .padding(0.01);
    //         svg.append("g")
    //             .call(d3.axisLeft(y));

    //         svg.selectAll()
    //         .data(dataset)
    //         .enter()
    //         .append("rect")
    //             .attr("x", function(d) { return x(d.city) })
    //             .attr("y", function(d) { return y(d.state) })
    //             .attr("width", x.bandwidth() )
    //             .attr("height", y.bandwidth() )
    //             .style("fill", function(d) { return interpolateYlOrRd(d.num)} )
    //         .on("mouseover", mouseover)
    //         .on("mousemove", mousemove)
    //         .on("mouseleave", mouseleave)
    //     }
    // })

}

main()
