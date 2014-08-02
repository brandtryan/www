function createSoccerViz() {
  d3.csv("teams.csv", function(data) {
    overallTeamViz(data);
  })
  
  d3.text("resources/modal.html", function(data) {d3.select("body").append("div").attr("id", "modal").html(data)});
  function overallTeamViz(incomingData) {
    worldCup = incomingData;
    d3.select("svg")
    .append("g")
    .attr("id", "teamsG")
    .attr("transform", "translate(50,300)").selectAll("g").data(incomingData)
    .enter()
    .append("g")
    .attr("class", "overallG")
    .on("click", teamClick)
    .on("mouseover", highlightRegion2)
    .on("mouseout", unHighlight)
    .attr("transform", function (d,i) {return "translate(" + (i * 50) + ", 0)"})
    
    var teamG = d3.selectAll("g.overallG");
    
    teamG
    .append("circle").attr("r", 0).style("fill", "pink").style("stroke", "black").style("stroke-width", "1px")
    .transition()
    .delay(function(d,i) {return i * 100})
    .duration(500)
    .attr("r", 40)
    .transition()
    .duration(500)
    .attr("r", 20);
    
    teamG
    .append("text")
    .style("text-anchor", "middle")
    .attr("y", 30)
    .style("font-size", "10px")
    .text(function(d) {return d.team})

  var dataKeys = d3.keys(incomingData[0]).filter(function (el) {return el != "team" && el != "region"})
    
    d3.select("#controls").selectAll("button.teams").data(dataKeys).enter().append("button")
    .on("click", buttonClick)
    .html(function(d) {return d})
    
  }
}

function buttonClick2(d) {
  var maxValue = d3.max(worldCup, function(el) {return parseFloat(el[d])});
  var ybRamp = d3.scale.linear()
  .interpolate(d3.interpolateHcl)
  .domain([0,maxValue]).range(["", "hsl(228,30%,20%)"])
  var radiusScale = d3.scale.linear().domain([0,maxValue]).range([2,20]);
  d3.selectAll("g.overallG").select("circle").transition().duration(1000).style("fill", function(p) {return ybRamp(p[d])}).attr("r", function(p) {return radiusScale(p[d])})
}

function buttonClick(d) {
  var maxValue = d3.max(worldCup, function(el) {return parseFloat(el[d])});
  var colorQuantize = d3.scale.quantize().domain([0,maxValue]).range([0,1,2,3]);
  var tenColorScale = d3.scale.category10(["UEFA", "CONMEBOL", "CAF", "AFC"]);
  var radiusScale = d3.scale.linear().domain([0,maxValue]).range([2,20]);
  d3.selectAll("g.overallG").select("circle").transition().duration(1000).style("fill", function(p) {return tenColorScale(p.region)}).attr("r", function(p) {return radiusScale(p[d])})
}

function buttonClick3(d) {
  var maxValue = d3.max(worldCup, function(el) {return parseFloat(el[d])});
  var colorQuantize = d3.scale.quantize().domain([0,maxValue]).range(Reds[5]);
  var radiusScale = d3.scale.linear().domain([0,maxValue]).range([2,20]);
  d3.selectAll("g.overallG").select("circle").transition().duration(1000).style("fill", function(p) {return colorQuantize(p[d])}).attr("r", function(p) {return radiusScale(p[d])})
}

function unHighlight() {
  d3.selectAll("g.overallG").select("circle").style("fill", "pink");
  d3.selectAll("g.overallG").select("text").style("font-size", "10px").attr("y", 30);
}
function highlightRegion(d) {
  d3.selectAll("g.overallG").select("circle").style("fill", function(p) {return p.region == d.region ? "red" : "gray"})
}

function highlightRegion2(d,i) {
  var teamColor = d3.rgb("pink")
  d3.select(this).select("text").style("font-size", "30px").attr("y", 10)
  d3.selectAll("g.overallG").select("circle").style("fill", function(p) {return p.region == d.region ? teamColor.darker(.75) : teamColor.brighter(.5)})
  this.parentElement.appendChild(this);
}

