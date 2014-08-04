function createSoccerViz() {
d3.csv("../data/worldcup.csv", function(data) { 
overallTeamViz(data);
})

function overallTeamViz(incomingData) {
d3.select("svg")
.append("g")
.attr("id", "teamsG")
.attr("transform", "translate(50,300)")
.selectAll("g")
.data(incomingData)
.enter()
.append("g")
.attr("class", "overallG")
.attr("transform", function (d,i) {return "translate(" + (i * 50) + ", 0)"})

var teamG = d3.selectAll("g.overallG");

teamG
.append("circle")
.style("stroke", "black")
.style("stroke-width", "1px")
.attr("r", 0)
.transition()
.delay(function(d,i) { return i * 100 })
.duration(500)
.attr("r", 40)
.transition()
.duration(500)
.attr("r", 20)

teamG
.append("text")
.style("text-anchor", "middle")
.attr("y", 30)
.text(function(d) {return d.team})

  var dataKeys = d3.keys(incomingData[0])
  .filter(function(el) {return el != "team" && el != "region"})
    d3.select("#controls").selectAll("button.teams").data(dataKeys).enter().append("button")
    .on("click", buttonClick)
    .html(function(d) {return d})

  function buttonClick(d) {
    var maxValue = d3.max(incomingData, function(el) {return parseFloat(el[d])});
    var colorQuantize =
      d3.scale.quantize().domain([0,maxValue]).range(colorbrewer.Reds[5]);
    var radiusScale = d3.scale.linear().domain([0,maxValue]).range([2,20]);
    d3.selectAll("g.overallG").select("circle").transition().duration(1000)
    .style("fill", function(p) {return colorQuantize(p[d])}) 
    .attr("r", function(p) {return radiusScale(p[d])})
  }

teamG.on("mouseover", highlightRegion)

function highlightRegion(d,i) {
  var teamColor = d3.rgb("pink")
  d3.select(this)
  .select("text")
  .classed("active", true)
  .attr("y", 10)

  d3.selectAll("g.overallG")
  .select("circle")
  .style("fill", function(p) { return p.region == d.region ?
  teamColor.darker(.75) :
  teamColor.brighter(.5)})
  this.parentElement.appendChild(this);

}

teamG.on("mouseout", unHighlight)

function unHighlight() {
d3.selectAll("g.overallG")
.select("circle")
.attr("class", "");
d3.selectAll("g.overallG")
.select("text")
.classed("active", false)
.attr("y", 30);
}

d3.selectAll("g.overallG").insert("image", "text")
.attr("xlink:href", function(d) {
return "images/" + d.team + ".svg"
})
.attr("width", "45px").attr("height", "20px").attr("x", "-22")
.attr("y", "-10")

d3.text("resources/modal.html", function (data) {
d3.select("body")
.append("div")
.attr("id", "modal")
.html(data)
.on("click", teamClick)});

function teamClick(d) {
  d3.selectAll("td.data")
  .data(d3.values(d))
  .html(function(p) { return p })
}

d3.html("images/football.svg", function(data) {console.log(data)})

d3.html("images/football.svg", loadSVG);
function loadSVG(svgData) {
  d3.select(svgData).selectAll("path").each(function()
    {d3.select("svg").node().appendChild(this)})
  d3.selectAll("path").attr("transform", "translate(50,50)")
}
}
}