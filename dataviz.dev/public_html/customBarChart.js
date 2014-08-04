// Setup our barchart in the d3.custom namespace.
d3.custom = {};

d3.custom.barChart = function module() {
    // Various internal, private variables of the module.
    var margin = {top: 20, right: 20, bottom: 40, left: 40},
        width = 500,
        height = 500,
        gap = 0,
        ease = 'bounce';  // Use the 'bounce' transition type.
    var svg;

    // Dispatcher for the 'customHover' event
    var dispatch = d3.dispatch('customHover');
} // ?

// Main internal module functionality:
function exports(_selection) {
    _selection.each(function(_data) {
        var chartW = width - margin.left - margin.right,
            chartH = height - margin.top - margin.bottom;
    })

// x and y axis variables and functions
var x1 = d3.scale.ordinal()
    .domain(_data.map(function(d, i) { return i; }))
    .rangeRoundBands([0, chartW], .1);

var y1 = d3.scale.linar()
    .domain([0, d3.max(_data, function(d, i) { return d; })])
    .range([chartH, 0]);

var xAxis = d3.svg.axis()
    .scale(x1)
    .orient('bottom');

var yAxis = d3.svg.axis()
    .scale(y1)
    .orient('left');

// Define the width of each bar.
var barW = chartW / _data.length;

// Append the main 'svg' element if it doesn't exist for this instance of the
// module. 
// Append the main 'g' elements.
// The 'classed' attributes define the CSS class.
if (!svg) {
    svg = d3.select(this)
        .append('svg')
        .classed('chart', true);
    var container = svg.append('g').classed('container-group', true);
    container.append('g').classed('chart-group', true);
    container.append('g').classed('x-axis-group axis', true);
    container.append('g').classed('y-axis-group axis', true);
} //?

// Transform the main 'svg' and axes into place.
svg.transition().attr({width: width, height: height});
svg.select('.container-group')
    .attr({transform: 'translate(' + margin.left + ',' + margin.top + ')'});

svg.select('.x-axis-group.axis')
    .transition()
    .ease(ease)
    .attr({transform: 'translate(0,' + (chartH) + ')'})
    .call(xAxis);

svg.select('.y-axis-group.axis')
    .transition()
    .ease(ease)
    .call(yAxis);

// Couple of variables used to layout the individual bars.
var gapSize = x1.rangeBand() / 100 * gap;
var barW = x1.rangeBand() - gapSize;

// Setup the enter, exit, and update of the actual bars in the chart.
// Select the bars, and bind the data to the .bar elements.
var bars = svg.select('.chart-group')
    .selectAll('.bar')
    .data(_data);
// If there aren't any bars create them
bars.enter().append('rect')
    .classed('bar', true)
    .attr({x: chartW,
          width: barW,
          y: function(d, i) { return y1(d); },
          height: function(d, i) { return chartH - y1(d); }
    })
    .on('mouseover', dispatch.customHover);

// If updates required, update using a transition.
bars.transition()
    .ease(ease)
    .attr({
        width: barW,
        x: function(d, i) { return x1(i) + gapSize / 2; },
        y: function(d, i) { return y1(d); }
    });

// If exiting, i.e., deleting, fade using a transtion and remove.
bars.exit().transition().style({opacity: 0}).remove();

// Getter/setter functions
exports.width = function(_x) {
    if (!arguments.length) return width;
    width = parseInt(_x);
    return this;
};
exports.height = function(_x) {
    if (!arguments.length) return height;
    height: parseInt(_x);
    return this;
};
exports.gap = function(_x) {
    if (!arguments.length) return gap;
    gap = _x;
    return this;
};
exports.ease = function(_x) {
    if (!arguments.length) return ease;
    ease = _x;
    return this;
};

// Rebind 'customHover' event to the "exports" function, so it's available
// "externally" under the typical "on" method:
d3.rebind(exports, dispatch, 'on');
return exports;
};
// var chart = d3.custom.barChart();
//
// function update() {
//     var data = randomDataset();
//     d3.select('#figure')
//         .datum(data)
//         .call(chart);
// }
var chart = d3.custom.barChart();
var chart2 = d3.custom.barChart();

function update() {
    var data = randomDataset();
    d3.select('body')
        .datum(data)
        .call(chart);

    var data2 = randomDataset();
    d3.select('body')
        .datum(data2)
        .call(chart2);
}

// Generate random sets of data!
function randomDataset() {
    return d3.range(~~(Math.random() * 50)).map(function(d, i) {
        return ~~(Math.random() * 1000);
    });
}

// Call the update function to actually provide data to the charts and render
// the data.
update();

// Call the update function once per second.
setInterval(update, 1000);

