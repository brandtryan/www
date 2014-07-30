var width = 1024,
  height = 768,
  margin = 10;

var svg = d3.select('#graph')
  .append('svg')
  .attr('width', width+2*margin)
  .attr('height', height+2*margin);

var g = svg.append('g')
  .attr('transform', 'translate('+margin+', '+margin+')');

var sine = d3.range(0,10).map(
  function (k) { return [0.5*k*Math.PI,
                         Math.sin(0.5*k*Math.PI)]; });

var x = d3.scale.linear()
  .range([0, width/2-margin])
  .domain(d3.extent(sine, function (d) { return d[0]; })),
  y = d3.scale.linear().range([height/2-margin, 0]).domain([-1, 1]);

var line = d3.svg.line()
  .x(function (d) { return x(d[0]); })
    .y(function (d) { return y(d[1]); });

g.append('path')
  .datum(sine)
  .attr("d", line)
  .attr({stroke: 'steelblue',
        'stroke-width': 2,
        fill: 'none'});

g.append('path')
  .datum(sine)
  .attr("d", line.interpolate('step-before'))
  .attr({stroke: 'black',
    'stroke-width': 1,
    fill: 'none'});

var g2 = svg.append('g')
  .attr('transform', 'translate('+(width/2+margin)+', '+margin+')');

var area = d3.svg.area()
  .x(function (d) { return x(d[0]); })
  .y0(height/2)
  .y1(function (d) { return y(d[1]); })
  .interpolate('basis');

g2.append('path')
  .datum(sine)
  .attr("d", area)
  .attr({fill: 'steelblue',
    'fill-opacity': 0.4});

g2.append('path')
  .datum(sine)
  .attr("d", line.interpolate('basis'))
  .attr({stroke: 'steelblue',
    'stroke-width': 2,
    fill: 'none'});

var arc = d3.svg.arc();

var g3 = svg.append('g')
  .attr('transform', 'translate('+margin+', '+(height/2+margin)+')');

g3.append('path')
  .attr("d", arc({outerRadius: 100,
    innerRadius: 50,
    startAngle: -Math.PI*0.25,
    endAngle: Math.PI*0.25}))
  .attr('transform', 'translate(150, 150)')
  .attr('fill', 'lightslategray');

var symbols = d3.svg.symbol()
  .type(function (d, i) {
    if (d[1] > 0) {
      return 'triangle-down';
    } else {
      return 'triangle-up';
    }
  })
  .size(function (d, i) {
    if (i%2) {
      return 0;
    }else{
      return 64;
    }
  });

g2.selectAll('path')
  .data(sine)
  .enter()
  .append('path')
  .attr('d', symbols)
  .attr('transform', function (d) { return 'translate('+x(d[0])+','+y(d[1])+')'; })
  .attr({stroke: 'steelblue',
    'stroke-width': 2,
    fill: 'white'});

g3.append('g').selectAll('path')
  .data([{
    source: {radius: 50,
                  startAngle: -Math.PI*0.30,
                  endAngle: -Math.PI*0.20},
    target: {radius: 50,
                  startAngle: Math.PI*0.30,
                  endAngle: Math.PI*0.30 }}])
  .enter()
  .append('path')
  .attr("d", d3.svg.chord());

var data = d3.zip(d3.range(0, 12),
                            d3.shuffle(d3.range(0, 12))),
  colors=['linen', 'lightsteelblue', 'lightcyan',
          'lavender', 'honeydew', 'gainsboro'];

var chord = d3.svg.chord()
    .source(function (d) { return d[0]; })
    .target(function (d) { return d[1]; })
    .radius(150)
    .startAngle(function (d) { return -2*Math.PI*(1/data.length)*d; })
    .endAngle(function (d) {
      return -2*Math.PI*(1/data.length)*((d-1)%data.length); });

g3.append('g')
  .attr('transform', 'translate(300, 200)')
  .selectAll('path')
  .data(data)
  .enter()
  .append('path')
  .attr('d', chord)
  .attr('fill', function (d, i) { return colors[i%colors.length]; })
  .attr('stroke', function (d, i) { return colors[(i+1)%colors.length]; });

var g4 = svg.append('g')
  .attr('transform', 'translate('+(width/2)+','+(height/2)+')');

var moustache = [
  {source: {x: 250, y: 100}, target: {x: 500, y: 90}},
  {source: {x: 500, y: 90}, target: {x: 250, y: 120}},
  {source: {x: 250, y: 120}, target: {x: 0, y: 90}},
  {source: {x: 0, y: 90}, target: {x: 250, y: 100}},
  {source: {x: 500, y: 90}, target: {x: 490, y: 80}},
  {source: {x: 0, y: 90}, target: {x: 10, y: 80}},
];

g4.selectAll('path')
  .data(moustache)
  .enter()
  .append('path')
  .attr("d", d3.svg.diagonal())
  .attr({stroke: 'black',
              fill: 'none'});
