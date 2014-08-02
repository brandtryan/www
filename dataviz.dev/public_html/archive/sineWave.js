
var width = 1024,
    height = 768,
    margin = 10;

var svg = d3.select('#graph')
        .append('svg')
        .attr('width', width+margin*2)
        .attr('height', height+margin*2);

var g = svg.append('g')
        .attr('transform', 'translate('+margin+', '+margin+')');

var sine = d3.range(0,10).map(
    function (k) { return [0.5*k*Math.PI, 
                           Math.sin(0.5*k*Math.PI)]; });

var x = d3.scale.linear()
        .range([0, width/2-margin])
        .domain(d3.extent(sine, function (d) { return d[0]; })),
    y = d3.scale.linear().range([height/2-margin, 0]).domain([-1, 1]);

// var line = d3.svg.line()
        // .x(function (d) { return x(d[0]); })
//         .y(function (d) { return y(d[1]); });
//
// g.append('path')
//     .datum(sine)
//     .attr("d", line)
//     .attr({stroke: 'steelblue',
//            'stroke-width': 2,
//            fill: 'none'});
//
// g.append('path')
//     .datum(sine)
//     .attr("d", line.interpolate('step-before'))
//     .attr({stroke: 'black',
//            'stroke-width': 1,
//            fill: 'none'});
//
var area = d3.svg.area()
  .x(function (d) { return x(d[0]); })
  .y0(height/2)
  .y1(function (d) { return y(d[1]); })
  .interpolate('basis');

g.append('path')
  .datum(sine)
  .attr("d", area)
  .attr({fill: 'steelblue',
    'fill-opacity': 0.4});

g.append('path')
  .datum(sine)
  .attr("d", line.interpolate('basis'))
  .attr({stroke: 'steelblue',
    'stroke-width': 2,
    fill: 'none'});
