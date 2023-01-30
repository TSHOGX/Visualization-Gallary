async function drawBars() {
  const dataset = await d3.csv('./data/income_data.csv')

  // Create chart dimensions
  const width = 800
  let dimensions = {
    width: width,
    height: width * 0.9,
    margin: {
      top: 30,
      right: 10,
      bottom: 50,
      left: 50,
    },
  }
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  // Clean data
  console.log(dataset["2019 [YR2019]"])
  dataset.forEach(d => {
    if (d["2019 [YR2019]"] == 0) {
      d["2019 [YR2019]"] = NaN;
    } else {
      d["2019 [YR2019]"] = Number(d["2019 [YR2019]"])
    }
    // console.log(d["2019 [YR2019]"])
  })

  const drawHistogram = metric => {
    const metricAccessor = d => d[metric]
    const yAccessor = d => d.length

    const wrapper = d3
      .select('#wrapper')
      .append('svg')
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)

    const bounds = wrapper
      .append('g')
      .style(
        'transform',
        `translate(${dimensions.margin.left}px, ${dimensions.margin.top})`
      )
    
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(dataset, metricAccessor))
      .range([0, dimensions.boundedWidth])
      .nice()
    console.log(dimensions.boundedWidth)

    const binsGenerator = d3
      .histogram()
      .domain(xScale.domain())
      .value(metricAccessor)
      .thresholds(12)

    // Create our bins
    const bins = binsGenerator(dataset)

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(bins, yAccessor)]) // We will never have negative days, so we can start at 0
      .range([dimensions.boundedHeight, 0])
      .nice()

    const binsGroup = bounds.append('g')
      // .attr("tabindex", "0")
      // .attr("role", "list")
      // .attr("aria-label", "histogram bars")

    const binGroups = binsGroup
      .selectAll('g')
      .data(bins)
      .enter()
      .append('g')
        .attr("tabindex", "0")
        .attr("role", "listitem")
        .attr("aria-label", d => `There were ${
          yAccessor(d)
        } days between ${
          d.x0.toString().slice(0,4)
        } and ${
          d.x1.toString().slice(0,4)
        } ${
          metric
        } levels.`)
    // Draw our bars
    const barPadding = 1
    const barRects = binGroups
      .append('rect') // rect elements need x, y, width, and height attributes
      // x value corresponds to the left side of the bar and will start with the lower bound of the bin (x0)
      .attr('x', d => xScale(d.x0) + barPadding / 2)
      // y value corresponds to the top of the bar (using yScale to conver the frequency value into pixel space)
      .attr('y', d => yScale(yAccessor(d)))
      // To calculate the width of a bar, we need to subtract x0 from x1...then subtract bar padding and protect against a negative width
      .attr('width', d => d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding]))
      // Calculate bar height by subtracting the y value from the bottom of the y axis
      .attr('height', d => dimensions.boundedHeight - yScale(yAccessor(d)))
      .attr('fill', '#8EA7E9')

    const barText = binGroups
      .filter(yAccessor)
      .append('text')
      .attr('x', d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
      .attr('y', d => yScale(yAccessor(d)) - 5)
      .text(yAccessor)
      .style('text-anchor', 'middle')
      .attr('fill', '#8EA7E9')
      .style('font-size', '15px')
      .style('font-family', 'sans-serif')

    // Mean
    const mean = d3.mean(dataset, metricAccessor)
    const meanLine = bounds
      .append('line')
      .attr('x1', xScale(mean))
      .attr('x2', xScale(mean))
      .attr('y1', 25)
      .attr('y2', dimensions.boundedHeight)
      .attr('stroke', '#7286D3')
      .attr('stroke-dasharray', '6px 6px')
    const meanLabel = bounds
      .append('text')
      .attr('x', xScale(mean))
      .attr('y', 15)
      .text('mean')
      .attr('fill', '#7286D3')
      .style('font-size', '15px')
      .style('text-anchor', 'middle')
      .style('font-family', 'sans-serif')

    const xAxisGenerator = d3.axisBottom().scale(xScale)

    const xAxis = bounds
      .append('g')
      .call(xAxisGenerator)
      .style('transform', `translateY(${dimensions.boundedHeight}px)`)

    const xAxisLabel = xAxis
      .append('text')
      .attr('x', dimensions.boundedWidth / 2)
      .attr('y', dimensions.margin.bottom - 10)
      .attr('fill', '#34495e')
      .style('font-size', '15px')
      .text("Income share held by highest 10% (2019)")
      .style("text-transform", "capitalize")

    wrapper.selectAll("text")
      .attr("role", "presentation")
      .attr("aria-hidden", "true")
  }

  const metrics = [
    "2019 [YR2019]",
  ]

  metrics.forEach(drawHistogram)
}

drawBars()
