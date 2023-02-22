async function main() {

    const dataset = await d3.csv('./data/data.csv')

    function drawPathOnImg(imgID, expertID) {
        const focusData = dataset.filter(function(d){return (d.image_id == "C"+imgID && d.username == "P"+expertID)})
        const scaleSize = 5*32
        const marginSize = 10
        const imgW = parseInt(focusData[0]["imgW"])/scaleSize
        const imgH = focusData[0]["imgH"]/scaleSize
        // console.log(focusData)

        const fixationPoints = []
        focusData.forEach(function(d,i) {fixationPoints.push({x: d["CFixationPointXImage"]/scaleSize, y: d["CFixationPointYImage"]/scaleSize})})

        const svgContainer = d3
            .select("#wrapper")
            .append("svg")
            .attr("width", imgW+marginSize)
            .attr("height", imgH+marginSize)
            // .style('background-color', 'black')
        
        svgContainer.append("image")
            .attr("width", imgW)
            .attr("height", imgH)
            .attr("xlink:href", "./data/images/C"+imgID+".png")
        
        const line = d3.line()
            .x((d) => d.x)
            .y((d) => d.y);

        svgContainer.append("path")
            .attr("d", line(fixationPoints))
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("fill", "none");

        svgContainer.append("text")
            .text("Visual scan path of image C" + imgID + " from P" + expertID)
            .attr("x", 20)
            .attr("y", 20);
    }

    function drawPathOnImgAllExperts(imgID) {
        const focusData = dataset.filter(function(d){return (d.image_id == "C"+imgID)})
        const scaleSize = 4*32
        const marginSize = 10
        const imgW = parseInt(focusData[0]["imgW"])/scaleSize
        const imgH = focusData[0]["imgH"]/scaleSize
        // console.log(focusData)

        const svgContainer = d3
            .select("#wrapper")
            .append("svg")
            .attr("width", imgW+marginSize)
            .attr("height", imgH+marginSize)
            // .style('background-color', 'black')
        
        svgContainer.append("image")
            .attr("width", imgW)
            .attr("height", imgH)
            .attr("xlink:href", "./data/images/C"+imgID+".png")
        
        const line = d3.line()
            .x((d) => d.x)
            .y((d) => d.y);

        const colorBox = ['#B3005E', '#060047', '#609EA2', '#a2a2d0']
        // const colorScale = d3.scaleQuantize().domain([1, 11]).range(['#B3005E', '#060047', '#609EA2'])
        const colorScale = [1,0,2,1,0,2,3,3,1,0,2]
        expertIDs.forEach(function(expertID,i) {
            var focusExpertData = focusData.filter(function(d){return (d.username == "P"+expertID)})
            const fixationPoints = []
            focusExpertData.forEach(function(d,i) {fixationPoints.push({x: d["CFixationPointXImage"]/scaleSize, y: d["CFixationPointYImage"]/scaleSize})})
            
            svgContainer.append("path")
                .attr("d", line(fixationPoints))
                .attr("stroke", colorBox[colorScale[expertID-1]])
                // .attr("stroke", colorScale(expertID))
                .attr("stroke-width", 1)
                .attr("fill", "none");
            })

        const lineSize = 60*32/scaleSize
        svgContainer.append("text")
            .text("Visual scan path of image C" + imgID + " from all experts")
            .attr("font-size", 60*32/scaleSize)
            .attr("x", 80*32/scaleSize)
            .attr("y", 80*32/scaleSize);
        svgContainer.append("circle")
            .style("fill", '#B3005E')
            .attr("cx", 2*lineSize)
            .attr("cy", 2*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text("Resident: P2, 5, 10")
            .attr("font-size", 40*32/scaleSize)
            .attr("x", 2*lineSize)
            .attr("y", 2*lineSize)
            .attr("dx", lineSize/4)
            .attr("dy", lineSize/4);
        svgContainer.append("circle")
            .style("fill", '#060047')
            .attr("cx", 2*lineSize)
            .attr("cy", 3*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text("[0, 5] years in service: P1, 4, 9")
            .attr("font-size", 40*32/scaleSize)
            .attr("x", 2*lineSize)
            .attr("y", 3*lineSize)
            .attr("dx", lineSize/4)
            .attr("dy", lineSize/4);
        svgContainer.append("circle")
            .style("fill", '#609EA2')
            .attr("cx", 2*lineSize)
            .attr("cy", 4*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text("[6, 10] years in service: p3, 6, 11")
            .attr("font-size", 40*32/scaleSize)
            .attr("x", 2*lineSize)
            .attr("y", 4*lineSize)
            .attr("dx", lineSize/4)
            .attr("dy", lineSize/4);
        svgContainer.append("circle")
            .style("fill", '#a2a2d0')
            .attr("cx", 2*lineSize)
            .attr("cy", 5*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text(">10: P7, 8")
            .attr("font-size", 40*32/scaleSize)
            .attr("x", 2*lineSize)
            .attr("y", 5*lineSize)
            .attr("dx", lineSize/4)
            .attr("dy", lineSize/4);
    }

    function drawPointsOnImgAllExperts(imgID) {
        const focusData = dataset.filter(function(d){return (d.image_id == "C"+imgID)})
        const scaleSize = 2*32
        const marginSize = 10
        const imgW = parseInt(focusData[0]["imgW"])/scaleSize
        const imgH = focusData[0]["imgH"]/scaleSize
        // console.log(focusData)

        const svgContainer = d3
            .select("#wrapper")
            .append("svg")
            .attr("width", imgW+marginSize)
            .attr("height", imgH+marginSize)
            // .style('background-color', 'black')
        
        svgContainer.append("image")
            .attr("width", imgW)
            .attr("height", imgH)
            .attr("xlink:href", "./data/images/C"+imgID+".png")
        
        const line = d3.line()
            .x((d) => d.x)
            .y((d) => d.y);

        const colorBox = ['#B3005E', '#060047', '#609EA2', '#FFB84C']
        // const colorScale = d3.scaleQuantize().domain([1, 11]).range(['#B3005E', '#060047', '#609EA2'])
        const colorScale = [1,0,2,1,0,2,3,3,1,0,2]
        const lineSize = 60*32/scaleSize
        
        expertIDs.forEach(function(expertID,i) {
            var focusExpertData = focusData.filter(function(d){return (d.username == "P"+expertID)})
            const fixationPoints = []
            focusExpertData.forEach(function(d,i) {fixationPoints.push({x: d["CFixationPointXImage"]/scaleSize, y: d["CFixationPointYImage"]/scaleSize})})
        

            // svgContainer.append("path")
            //     // .attr("d", line(fixationPoints))
            //     .datum(fixationPoints)
            //     .attr("d", line)
            //     .attr("opacity","0.6")
            //     .attr("stroke", colorBox[colorScale[expertID-1]])
            //     // .attr("stroke", colorScale(expertID))
            //     .attr("stroke-width", 1)
            //     .attr("fill", "none");

            svgContainer.selectAll("myCircles")
                .data(fixationPoints)
                .join("circle")
                    // .attr("opacity","0.6")
                    .attr("fill", colorBox[colorScale[expertID-1]])
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
                    .attr("r", 3)
            })


        svgContainer.append("text")
            .text("Visual fixation points of image C" + imgID + " from all experts")
            .attr("font-size", 60*32/scaleSize)
            .attr("x", 80*32/scaleSize)
            .attr("y", 80*32/scaleSize);
        svgContainer.append("circle")
            .style("fill", '#B3005E')
            .attr("cx", 2*lineSize)
            .attr("cy", 2*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text("Resident: P2, 5, 10")
            .attr("font-size", 40*32/scaleSize)
            .attr("x", 2*lineSize)
            .attr("y", 2*lineSize)
            .attr("dx", lineSize/4)
            .attr("dy", lineSize/4);
        svgContainer.append("circle")
            .style("fill", '#060047')
            .attr("cx", 2*lineSize)
            .attr("cy", 3*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text("[0, 5] years in service: P1, 4, 9")
            .attr("font-size", 40*32/scaleSize)
            .attr("x", 2*lineSize)
            .attr("y", 3*lineSize)
            .attr("dx", lineSize/4)
            .attr("dy", lineSize/4);
        svgContainer.append("circle")
            .style("fill", '#609EA2')
            .attr("cx", 2*lineSize)
            .attr("cy", 4*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text("[6, 10] years in service: p3, 6, 11")
            .attr("font-size", 40*32/scaleSize)
            .attr("x", 2*lineSize)
            .attr("y", 4*lineSize)
            .attr("dx", lineSize/4)
            .attr("dy", lineSize/4);
        svgContainer.append("circle")
            .style("fill", '#FFB84C')
            .attr("cx", 2*lineSize)
            .attr("cy", 5*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text(">10: P7, 8")
            .attr("font-size", 40*32/scaleSize)
            .attr("x", 2*lineSize)
            .attr("y", 5*lineSize)
            .attr("dx", lineSize/4)
            .attr("dy", lineSize/4);
    }

    function drawBarFixationNumAndExp(imgID) {
        const margin = {top: 30, right: 30, bottom: 70, left: 60, range: 500},
            width = margin.range + 60 - margin.left - margin.right,
            height = margin.range - margin.top - margin.bottom;

        const focusData = dataset.filter(function(d){return (d.image_id == "C"+imgID)})
        // console.log(focusData)

        const svgContainer = d3
            .select("#wrapper")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // const colorBox = ['#B3005E', '#060047', '#609EA2', '#FFB84C']
        const colorBox = ['#E5E0FF', '#FEDEFF', '#8EA7E9', '#7286D3']
        const colorScale = [1,0,2,1,0,2,3,3,1,0,2]
        
        const fixNumToExp = []
        expertIDs.forEach(function(expertID,i) {
            var focusExpertData = focusData.filter(function(d){return (d.username == "P"+expertID)})
            fixNumToExp.push({x: "P"+expertID, y: focusExpertData.length, id: expertID})      
        })

        // sort data
        fixNumToExp.sort(function(b, a) {
            return a.y - b.y;
        });
        // console.log(fixNumToExp)

        // X axis
        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(fixNumToExp.map(d => d.x))
            .padding(0.2);
        svgContainer.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
                // .attr("font-size", 15)
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, 200])
            .range([ height, 0]);
        svgContainer.append("g")
            .call(d3.axisLeft(y))

        // Bars
        svgContainer.selectAll("mybar")
            .data(fixNumToExp)
            .enter()
            .append("rect")
                .attr("x", d => x(d.x))
                .attr("y", d => y(d.y))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.y))
                // .attr("fill", "#8EA7E9")
                .attr("fill", d => colorBox[colorScale[d.id-1]])

        var lineSize = margin.top/2
        svgContainer.append("text")
            .text("Bar graph of fixation number(y) and expert(x) for image C" + imgID)
            .attr("font-size", 14)
            .attr("x", margin.top/2)
            .attr("y", margin.top/2);

        svgContainer.append("circle")
            .style("fill", colorBox[0])
            .attr("cx", width - 10*lineSize)
            .attr("cy", 2*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text("Resident: P2, 5, 10")
            .attr("font-size", 12)
            .attr("x", width - 10*lineSize)
            .attr("y", 2*lineSize)
            .attr("dx", lineSize/3)
            .attr("dy", lineSize/4);

        svgContainer.append("circle")
            .style("fill", colorBox[1])
            .attr("cx", width - 10*lineSize)
            .attr("cy", 3*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text("[0, 5] years in service: P1, 4, 9")
            .attr("font-size", 12)
            .attr("x", width - 10*lineSize)
            .attr("y", 3*lineSize)
            .attr("dx", lineSize/3)
            .attr("dy", lineSize/4);

        svgContainer.append("circle")
            .style("fill", colorBox[2])
            .attr("cx", width - 10*lineSize)
            .attr("cy", 4*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text("[6, 10] years in service: p3, 6, 11")
            .attr("font-size", 12)
            .attr("x", width - 10*lineSize)
            .attr("y", 4*lineSize)
            .attr("dx", lineSize/3)
            .attr("dy", lineSize/4);

        svgContainer.append("circle")
            .style("fill", colorBox[2])
            .attr("cx", width - 10*lineSize)
            .attr("cy", 5*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text(">10: P7, 8")
            .attr("font-size", 12)
            .attr("x", width - 10*lineSize)
            .attr("y", 5*lineSize)
            .attr("dx", lineSize/3)
            .attr("dy", lineSize/4);
    }

    function drawBarNavigatorNumAndExp(imgID) {
        const margin = {top: 30, right: 30, bottom: 70, left: 60, range: 500},
            width = margin.range + 60 - margin.left - margin.right,
            height = margin.range - margin.top - margin.bottom;

        const svgContainer = d3
            .select("#wrapper")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // const colorBox = ['#B3005E', '#060047', '#609EA2', '#FFB84C']
        const colorBox = ['#E5E0FF', '#FEDEFF', '#8EA7E9', '#7286D3']
        const colorScale = [1,0,2,1,0,2,3,3,1,0,2]
        
        const focusData = dataset.filter(function(d){return (d.image_id == "C"+imgID)})
        const navNumToExp = []
        var typeStr = ["Resident", "[0, 5] years", "[6, 10] years", ">10"]
        var count = [0,0,0,0]
        expertIDs.forEach(function(expertID,i) {
            if (expertID == 2 || expertID == 5 || expertID == 10) {
                var focusExpertData = focusData.filter(function(d){return (d.username == "P"+expertID || d.inNavigator == "TRUE")})
                count[0] = count[0] + focusExpertData.length
            } else if (expertID == 1 || expertID == 4 || expertID == 9) {
                var focusExpertData = focusData.filter(function(d){return (d.username == "P"+expertID || d.inNavigator == "TRUE")})
                count[1] = count[1] + focusExpertData.length
            } else if (expertID == 3 || expertID == 6 || expertID == 11) {
                var focusExpertData = focusData.filter(function(d){return (d.username == "P"+expertID || d.inNavigator == "TRUE")})
                count[2] = count[2] + focusExpertData.length
            } else {
                var focusExpertData = focusData.filter(function(d){return (d.username == "P"+expertID || d.inNavigator == "TRUE")})
                count[3] = count[3] + focusExpertData.length
            }
            // fixNumToExp.push({x: "P"+expertID, y: focusExpertData.length, id: expertID})      
        })
        for (var i=0; i<4; i++) {
            navNumToExp.push({x: typeStr[i], y: count[i]})
        }
        console.log(navNumToExp)

        // // sort data
        // fixNumToExp.sort(function(b, a) {
        //     return a.y - b.y;
        // });
        // // console.log(fixNumToExp)

        // X axis
        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(navNumToExp.map(d => d.x))
            .padding(0.2);
        svgContainer.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
                // .attr("font-size", 15)
                // .attr("transform", "translate(-10,0)rotate(-45)")
                // .style("text-anchor", "end");

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, 900])
            .range([ height, 0]);
        svgContainer.append("g")
            .call(d3.axisLeft(y))

        // Bars
        svgContainer.selectAll("mybar")
            .data(navNumToExp)
            .enter()
            .append("rect")
                .attr("x", d => x(d.x))
                .attr("y", d => y(d.y))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.y))
                .attr("fill", "#8EA7E9")
                // .attr("fill", d => colorBox[colorScale[d.id-1]])

        var lineSize = margin.top/2
        svgContainer.append("text")
            .text("Bar graph of experience type(x) and number of fix on navigator(y) for image C" + imgID)
            .attr("font-size", 12)
            .attr("x", margin.top/2)
            .attr("y", margin.top/2);
    }

    function drawScatterNavigatorNumAndExp(imgID) {
        const margin = {top: 30, right: 30, bottom: 70, left: 60, range: 500},
            width = margin.range + 60 - margin.left - margin.right,
            height = margin.range - margin.top - margin.bottom;

        const svgContainer = d3
            .select("#wrapper")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // const colorBox = ['#B3005E', '#060047', '#609EA2', '#FFB84C']
        const colorBox = ['#E5E0FF', '#FEDEFF', '#8EA7E9', '#7286D3']
        const colorScale = [1,0,2,1,0,2,3,3,1,0,2]
        
        // data
        const focusData = dataset.filter(function(d){return (d.image_id == "C"+imgID)})
        const navNumToExp = []
        var typeStr = ["Resident", "[0, 5] years", "[6, 10] years", ">10"]
        var count = [0,0,0,0]
        expertIDs.forEach(function(expertID,i) {
            if (expertID == 2 || expertID == 5 || expertID == 10) {
                var focusExpertData = focusData.filter(function(d){return (d.username == "P"+expertID || d.inNavigator == "TRUE")})
                navNumToExp.push({x: focusExpertData.length, y: 1})
            } else if (expertID == 1 || expertID == 4 || expertID == 9) {
                var focusExpertData = focusData.filter(function(d){return (d.username == "P"+expertID || d.inNavigator == "TRUE")})
                navNumToExp.push({x: focusExpertData.length, y: 2})
            } else if (expertID == 3 || expertID == 6 || expertID == 11) {
                var focusExpertData = focusData.filter(function(d){return (d.username == "P"+expertID || d.inNavigator == "TRUE")})
                navNumToExp.push({x: focusExpertData.length, y: 3})
            } else {
                var focusExpertData = focusData.filter(function(d){return (d.username == "P"+expertID || d.inNavigator == "TRUE")})
                navNumToExp.push({x: focusExpertData.length, y: 4})
            }
            // fixNumToExp.push({x: "P"+expertID, y: focusExpertData.length, id: expertID})      
        })
        // console.log(navNumToExp)

        // Add X axis: inNavigator
        var x = d3.scaleLinear()
            .domain([0, 200])
            .range([ 0, width ]);
        svgContainer.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis: exp
        var y = d3.scaleLinear()
            .domain([0, 5])
            .range([ height, 0]);
        svgContainer.append("g")
            .call(d3.axisLeft(y));

        // Add a scale for bubble color
        const myColor = d3.scaleOrdinal()
            .domain(["Asia", "Europe", "Americas", "Africa", "Oceania"])
            .range(d3.schemeSet2);

        // Add dots
        svgContainer.append('g')
            .selectAll("dot")
            .data(navNumToExp)
            .join("circle")
                .attr("cx", d => x(d.x))
                .attr("cy", d => y(d.y))
                .attr("r", d => 8)
                // .style("fill", d => myColor(d.continent))
                .style("opacity", "0.7")
                .attr("stroke", "white")
                .style("stroke-width", "2px")

        var lineSize = margin.top/2
        svgContainer.append("text")
            .text("Scatter graph of experience type(y) and number of fix on navigator(x) for image C" + imgID)
            .attr("font-size", 12)
            .attr("x", margin.top/2)
            .attr("y", margin.top/2);

        svgContainer.append("text")
            .text("y = 1: Resident: P2, 5, 10")
            .attr("font-size", 12)
            .attr("x", width - 12*lineSize)
            .attr("y", 2*lineSize)
            .attr("dx", lineSize/3)
            .attr("dy", lineSize/4);

        svgContainer.append("text")
            .text("y = 2: [0, 5] years in service: P1, 4, 9")
            .attr("font-size", 12)
            .attr("x", width - 12*lineSize)
            .attr("y", 3*lineSize)
            .attr("dx", lineSize/3)
            .attr("dy", lineSize/4);

        svgContainer.append("text")
            .text("y = 3: [6, 10] years in service: p3, 6, 11")
            .attr("font-size", 12)
            .attr("x", width - 12*lineSize)
            .attr("y", 4*lineSize)
            .attr("dx", lineSize/3)
            .attr("dy", lineSize/4);

        svgContainer.append("text")
            .text("y = 4: >10: P7, 8")
            .attr("font-size", 12)
            .attr("x", width - 12*lineSize)
            .attr("y", 5*lineSize)
            .attr("dx", lineSize/3)
            .attr("dy", lineSize/4);
        
    }

    function drawBarAcc(imgID) {
        const margin = {top: 30, right: 30, bottom: 70, left: 60, range: 500},
            width = margin.range + 60 - margin.left - margin.right,
            height = margin.range - margin.top - margin.bottom;

        const focusData = dataset.filter(function(d){return (d.image_id == "C"+imgID)})
        // console.log(focusData)

        const svgContainer = d3
            .select("#wrapper")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // const colorBox = ['#B3005E', '#060047', '#609EA2', '#FFB84C']
        const colorBox = ['#E5E0FF', '#FEDEFF', '#8EA7E9', '#7286D3']
        const colorScale = [1,0,2,1,0,2,3,3,1,0,2]
        
        const data = []
        expertIDs.forEach(function(expertID,i) {
            var fixationNum = focusData.filter(function(d){return (d.username == "P"+expertID)}).length
            var inGTNum = focusData.filter(function(d){return (d.username == "P"+expertID && d.inGT != 0)}).length
            var inAnnotationNum = focusData.filter(function(d){return (d.username == "P"+expertID && d.inGT != 0 && d.inAnnotationNum != 0)}).length
            if (expertID == 2 || expertID == 5 || expertID == 10) {
                data.push({id: "P"+expertID, fixationNum: fixationNum, inGTNum: inGTNum, inAnnotationNum: inAnnotationNum, type: 0})      
            } else if (expertID == 1 || expertID == 4 || expertID == 9) {
                data.push({id: "P"+expertID, fixationNum: fixationNum, inGTNum: inGTNum, inAnnotationNum: inAnnotationNum, type: 1})      
            } else if (expertID == 3 || expertID == 6 || expertID == 11) {
                data.push({id: "P"+expertID, fixationNum: fixationNum, inGTNum: inGTNum, inAnnotationNum: inAnnotationNum, type: 2})      
            } else {
                data.push({id: "P"+expertID, fixationNum: fixationNum, inGTNum: inGTNum, inAnnotationNum: inAnnotationNum, type: 3})      
            }
        })

        // // sort data
        // fixNumToExp.sort(function(b, a) {
        //     return a.y - b.y;
        // });
        // // console.log(fixNumToExp)

        // X axis: expert id
        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(d => d.id))
            .padding(0.2);
        svgContainer.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
                // .attr("font-size", 15)
                // .attr("transform", "translate(-10,0)rotate(-45)")
                // .style("text-anchor", "end");

        // Y axis: nums
        const y = d3.scaleLinear()
            .domain([0, 500])
            .range([ height, 0]);
        svgContainer.append("g")
            .call(d3.axisLeft(y))

        // Bars fixationNum
        svgContainer.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", d => x(d.id))
                .attr("y", d => y(d.fixationNum))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.fixationNum))
                .attr("fill", "#F5E9CF")
                .attr("opacity","0.6")
                // .attr("fill", d => colorBox[d.type])

        // Bars inGTNum
        svgContainer.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", d => x(d.id))
                .attr("y", d => y(d.inGTNum))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.inGTNum))
                .attr("fill", "#E96479")
                .attr("opacity","0.6")
                // .attr("fill", d => colorBox[d.type])

        // // Bars inAnnotationNum
        // svgContainer.selectAll("mybar")
        //     .data(data)
        //     .enter()
        //     .append("rect")
        //         .attr("x", d => x(d.id))
        //         .attr("y", d => y(d.inAnnotationNum))
        //         .attr("width", x.bandwidth())
        //         .attr("height", d => height - y(d.inAnnotationNum))
        //         .attr("fill", "#4D455D")
        //         .attr("opacity","0.6")
        //         // .attr("fill", d => colorBox[d.type])

        
        var lineSize = margin.top/2
        svgContainer.append("text")
            .text("Bar graph of numbers(y) and expert(x) for image C" + imgID)
            .attr("font-size", 14)
            .attr("x", margin.top/2)
            .attr("y", margin.top/2);

        svgContainer.append("circle")
            .style("fill", "#F5E9CF")
            .attr("cx", width - 10*lineSize)
            .attr("cy", 2*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text("total fixation number")
            .attr("font-size", 12)
            .attr("x", width - 10*lineSize)
            .attr("y", 2*lineSize)
            .attr("dx", lineSize/3)
            .attr("dy", lineSize/4);

        svgContainer.append("circle")
            .style("fill", "#E96479")
            .attr("cx", width - 10*lineSize)
            .attr("cy", 3*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text("inGT number")
            .attr("font-size", 12)
            .attr("x", width - 10*lineSize)
            .attr("y", 3*lineSize)
            .attr("dx", lineSize/3)
            .attr("dy", lineSize/4);

        // svgContainer.append("circle")
        //     .style("fill", "#4D455D")
        //     .attr("cx", width - 10*lineSize)
        //     .attr("cy", 4*lineSize)
        //     .attr("r", lineSize/4);
        // svgContainer.append("text")
        //     .text("inGT & inAnnotation number")
        //     .attr("font-size", 12)
        //     .attr("x", width - 10*lineSize)
        //     .attr("y", 4*lineSize)
        //     .attr("dx", lineSize/3)
        //     .attr("dy", lineSize/4);

    }

    function drawBubbleAcc(imgID) {
        const margin = {top: 30, right: 30, bottom: 70, left: 60, range: 500},
            width = margin.range + 60 - margin.left - margin.right,
            height = margin.range - margin.top - margin.bottom;

        const svgContainer = d3
            .select("#wrapper")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // const colorBox = ['#B3005E', '#060047', '#609EA2', '#FFB84C']
        // const colorBox = ['#E5E0FF', '#FEDEFF', '#8EA7E9', '#7286D3']
        const colorBox = ['#3A1078', '#7DB9B6', '#E96479', '#F5E9CF']
        const colorScale = [1,0,2,1,0,2,3,3,1,0,2]
        
        // data
        const focusData = dataset.filter(function(d){return (d.image_id == "C"+imgID)})
        const data = []
        expertIDs.forEach(function(expertID,i) {
            var fixationNum = focusData.filter(function(d){return (d.username == "P"+expertID)}).length
            var inGTNum = focusData.filter(function(d){return (d.username == "P"+expertID && d.inGT != 0)}).length
            var inAnnotationNum = focusData.filter(function(d){return (d.username == "P"+expertID && d.inGT != 0 && d.inAnnotationNum != 0)}).length
            if (expertID == 2 || expertID == 5 || expertID == 10) {
                data.push({id: "P"+expertID, fixationNum: fixationNum, inGTNum: inGTNum, inAnnotationNum: inAnnotationNum, type: 0})      
            } else if (expertID == 1 || expertID == 4 || expertID == 9) {
                data.push({id: "P"+expertID, fixationNum: fixationNum, inGTNum: inGTNum, inAnnotationNum: inAnnotationNum, type: 1})      
            } else if (expertID == 3 || expertID == 6 || expertID == 11) {
                data.push({id: "P"+expertID, fixationNum: fixationNum, inGTNum: inGTNum, inAnnotationNum: inAnnotationNum, type: 2})      
            } else {
                data.push({id: "P"+expertID, fixationNum: fixationNum, inGTNum: inGTNum, inAnnotationNum: inAnnotationNum, type: 3})      
            }
        })
        // console.log(data)

        // Add X axis: fixationNum
        var x = d3.scaleLinear()
            .domain([0, 500])
            .range([ 0, width ]);
        svgContainer.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis: inGTNum
        var y = d3.scaleLinear()
            .domain([0, 70])
            .range([ height, 0]);
        svgContainer.append("g")
            .call(d3.axisLeft(y));

        // Add dots
        svgContainer.append('g')
            .selectAll("dot")
            .data(data)
            .join("circle")
                .attr("cx", d => x(d.fixationNum))
                .attr("cy", d => y(d.inGTNum))
                .attr("r", d => 7*(d.type+1))
                .style("fill", d => colorBox[d.type])
                .style("opacity", "0.7")
                .attr("stroke", "white")
                .style("stroke-width", "2px")

        var lineSize = margin.top/2
        svgContainer.append("text")
            .text("Bubble graph of fixation on GT(y) and number of fixation(x) for image C" + imgID)
            .attr("font-size", 12)
            .attr("x", margin.top/2)
            .attr("y", margin.top/2);

        svgContainer.append("circle")
            .style("fill", colorBox[0])
            .attr("cx", width - 10*lineSize)
            .attr("cy", 2*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text("Resident: P2, 5, 10")
            .attr("font-size", 12)
            .attr("x", width - 10*lineSize)
            .attr("y", 2*lineSize)
            .attr("dx", lineSize/3)
            .attr("dy", lineSize/4);

        svgContainer.append("circle")
            .style("fill", colorBox[1])
            .attr("cx", width - 10*lineSize)
            .attr("cy", 3*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text("[0, 5] years in service: P1, 4, 9")
            .attr("font-size", 12)
            .attr("x", width - 10*lineSize)
            .attr("y", 3*lineSize)
            .attr("dx", lineSize/3)
            .attr("dy", lineSize/4);

        svgContainer.append("circle")
            .style("fill", colorBox[2])
            .attr("cx", width - 10*lineSize)
            .attr("cy", 4*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text("[6, 10] years in service: p3, 6, 11")
            .attr("font-size", 12)
            .attr("x", width - 10*lineSize)
            .attr("y", 4*lineSize)
            .attr("dx", lineSize/3)
            .attr("dy", lineSize/4);

        svgContainer.append("circle")
            .style("fill", colorBox[3])
            .attr("cx", width - 10*lineSize)
            .attr("cy", 5*lineSize)
            .attr("r", lineSize/4);
        svgContainer.append("text")
            .text(">10: P7, 8")
            .attr("font-size", 12)
            .attr("x", width - 10*lineSize)
            .attr("y", 5*lineSize)
            .attr("dx", lineSize/3)
            .attr("dy", lineSize/4);
        
    }

    const imgIDs = [];
    for (var i=1; i<61; i++) {
        imgIDs.push(i);
    }

    const expertIDs = [];
    for (var i=1; i<12; i++) {
        expertIDs.push(i);
    }

    // for(var i=0; i<imgIDs.length; i++) {
    //     for (var j=1; j<expertIDs.length; j++) {
    //         drawPathOnImg(imgIDs[i], expertIDs[j])
    //     }
    // }

    for(var i=0; i<imgIDs.length; i++) {
        // drawPathOnImgAllExperts(imgIDs[i])
        drawPointsOnImgAllExperts(imgIDs[i])
        // drawBarFixationNumAndExp(imgIDs[i])
        // drawBarNavigatorNumAndExp(imgIDs[i])
        // drawScatterNavigatorNumAndExp(imgIDs[i])
        // drawBarAcc(imgIDs[i])
        // drawBubbleAcc(imgIDs[i])
    }

    // const pathOnImg = imgID => {}
    // imgIDs.forEach(pathOnImg)

}

main()  
