async function drawMap() {
  // Access data
  const countryShapes = await d3.json('./data/world-geojson.json')
  const countryNameAccessor = d => d.properties['NAME']
  const countryIdAccessor = d => d.properties['ADM0_A3_IS']

  const dataset = await d3.csv('./data/income_data.csv')
  const metric = 'Income share held by highest 10%'

  let metricDataByCountry = {}
  dataset.forEach(d => {
    if (d['Series Name'] != metric) return
    metricDataByCountry[d['Country Code']] = d['2019 [YR2019]'] || 0
  })

  let dimensions = {
    width: window.innerWidth * 0.9,
    margin: {
      top: 20,
      right: 10,
      bottom: 10,
      left: 10,
    },
  }
  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right

  // Define our globe using a mock GeoJSON object
  const sphere = { type: 'Sphere' }
  const projection = d3
    .geoEqualEarth()
    .fitWidth(dimensions.boundedWidth, sphere)
  const pathGenerator = d3.geoPath(projection) 

  const [[x0, y0], [x1, y1]] = pathGenerator.bounds(sphere)

  dimensions.boundedHeight = y1
  dimensions.height =
    dimensions.boundedHeight + dimensions.margin.top + dimensions.margin.bottom

  // Draw canvas
  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)

  const bounds = wrapper
    .append('g')
    .style(
      'transform',
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    )

  const metricValues = Object.values(metricDataByCountry) // Grab all of the population growth values
  
  // Clean data: delete missing value
  for (var i = 0; i<metricValues.length; i++) {
    if (metricValues[i] == 0) {
      metricValues[i] = NaN;
    } else {
      metricValues[i] = Number(metricValues[i])
    }
  }
  const metricValueExtent = d3.extent(metricValues) 
  // console.log(metricValueExtent) 

  // Our extent starts below zero, meaning that at least one country experienced negative population growth. Let's represent decline on a red color scale, growth on a green color scale, and neutral as white - a "diverging" color scale. All we need to do is add a middle value to the domain and range.
  const maxChange = d3.max([-metricValueExtent[0], metricValueExtent[1]])
  const colorScale = d3
    .scaleLinear()
    .domain(metricValueExtent)
    .range(['#FFF2F2', '#7286D3'])

  // Draw data
  const earth = bounds
    .append('path')
    .attr('class', 'earth')
    .attr('d', pathGenerator(sphere))

  const graticuleJson = d3.geoGraticule10()
  const graticule = bounds
    .append('path') 
    .attr('class', 'graticule')
    .attr('d', pathGenerator(graticuleJson))

  // Draw our countries
  const countries = bounds
    .selectAll('.country')
    .data(countryShapes.features) 
    .enter()
    .append('path') 
    .attr('class', 'country')
    .attr('d', pathGenerator)
    .attr('fill', d => {
      const metricValue = metricDataByCountry[countryIdAccessor(d)]
      if (typeof metricValue === undefined) return '#e2e6e9'
      return colorScale(metricValue) 
    })

  // Map legend
  const legendGroup = wrapper
    .append('g')
    .attr(
      'transform',
      `translate(${120},${
        dimensions.width < 800
          ? dimensions.boundedHeight - 30
          : dimensions.boundedHeight * 0.5
      })`
    )

  const legendTitle = legendGroup
    .append('text')
    .attr('y', -23)
    .attr('class', 'legend-title')
    .text('Income share in 2019')

  const legendByline = legendGroup
    .append('text')
    .attr('y', -9)
    .attr('class', 'legend-byline')
    .text('Held by highest 10%')

  const defs = wrapper.append('defs')
  const legendGradientId = 'legend-gradient'
  const gradient = defs
    .append('linearGradient')
    .attr('id', legendGradientId)
    .selectAll('stop')
    .data(colorScale.range())
    .enter()
    .append('stop')
    .attr('stop-color', d => d)
    .attr(
      'offset',
      (d, i) =>
        `${
          (i * 100) / 2 
        }%`
    )

  const legendWidth = 120
  const legendHeight = 16
  const legendGradient = legendGroup
    .append('rect')
    .attr('x', -legendWidth / 2)
    .attr('height', legendHeight)
    .attr('width', legendWidth)
    .style('fill', `url(#${legendGradientId})`)

  const legendValueRight = legendGroup
    .append('text')
    .attr('class', 'legend-value')
    .attr('x', legendWidth / 2 + 10)
    .attr('y', legendHeight / 2)
    .text(`${d3.format('.1f')(metricValueExtent[1])}%`)

  const legendValueLeft = legendGroup
    .append('text')
    .attr('class', 'legend-value')
    .attr('x', -legendWidth / 2 - 10)
    .attr('y', legendHeight / 2)
    .text(`${d3.format('.1f')(metricValueExtent[0])}%`)
    .style('text-anchor', 'end')

  // Mark the user's current location
  navigator.geolocation.getCurrentPosition(myPosition => {
    console.log(myPosition)
    const [x, y] = projection([
      myPosition.coords.longitude,
      myPosition.coords.latitude
    ])
    const myLocation = bounds.append("circle")
      .attr("class", "my-location")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", 0)
      .transition().duration(500)
        .attr("r", 10)
  })

}
drawMap()
