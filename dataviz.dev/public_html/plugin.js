d3.edge = {};

d3.edge.table = function module() {
  var fontSize = 10,
      fontColor = 'red';

      // To get events out of the module
      // we use d3.dispatch, declaring a "hover" event
      var dispatch = d3.dispatch('customHover');
      function exports(_selection) {
        _selection.each(function(_data) {
          d3.select(this)
          .append('div')
          .style({
            'font-size': fontSize + 'px',
            color: fontColor
          })
          .html('Hello World: ' + _data)
          // we trigger the "customHover" event which will receive
          // the usual "d" and "i" arguments as it is equivalent to:
          //  .on('mouseover', function(d, i) {
          //    return dispatch.customHover(d, i);
          //  });
          .on('mouseover', dispatch.customHover);
      });
  }
  exports.fontSize = function(_x) {
    if (!arguments.length) return fontSize;
    fontSize = _x;
    return this;
  };
  exports.fontColor = function(_x) {
    if (!arguments.length) return fontColor;
    fontColor = _x;
    return this;
  };
  // We can rebind the custom events to the "exports" function
  // so it's availabe under the typical "on" method
  d3.rebind(exports, dispatch, "on");
  return exports;
};

// Setters can also be chained directly to the returned function
var table = d3.edge.table().fontSize('20').fontColor('green');
// We bind a listener function to the custom event
table.on('customHover', function(d, i){
  console.log('customHoever: ' + d, i);
});

d3.select('body')
.datum(dataset)
.call(table);
