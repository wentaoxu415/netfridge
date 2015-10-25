FridgeVis = function(parentElement, data){
  this.parentElement = parentElement;
  this.Data = data;
  this.initVis();
}

FridgeVis.prototype.initVis = function(){
  var that = this;

  // Format for reading in timestamp
  // var formatTime = d3.time.format("%a %b %d %Y %H:%M:%S")
  // var formatTime = d3.time.format("%H:%M")

  // var getHourMin = d3.time.format("%H:%M")

  this.margin = {top: 20, right: 20, bottom: 30, left: 50};

  this.width = parseInt(d3.select("#fridge_graph").style("width")) 
  - this.margin.left - this.margin.right;

  this.height = parseInt(d3.select("#fridge_graph").style("height")) 
  - this.margin.top - this.margin.bottom;

  this.x = d3.time.scale()
      .range([0, this.width])

  this.y = d3.scale.linear()
      .range([this.height, 0])

  this.xAxis = d3.svg.axis()
      .scale(this.x)
      .orient('bottom')
      .ticks(4)

  this.yAxis = d3.svg.axis()
    .scale(this.y)
    .orient('left')
    .ticks(5)
    .tickFormat(d3.format('d'))

  this.Data.forEach(function(d){  
    time = new Date(d.time);
    // d.time = formatTime(time);
    d.time = time;
    d.value = +d.value;
  })

  
  // this.x.domain([new Date('2015-03-20T00:00:00+00:00'), new Date('2015-03-20T23:59:59+00:00')])
  this.x.domain(d3.extent(that.Data, function(d) {return d.time; }));
  this.y.domain(d3.extent(that.Data, function(d) {return d.value; }));


  this.line = d3.svg.line()
    .x(function(d){return that.x(d.time);})
    .y(function(d){return that.y(d.value);})

  this.svg = d3.select("#fridge_graph").append("svg")
    .attr("width", this.width + this.margin.left + this.margin.right)
    .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

  this.svg.append("g")
    .attr("class", "x axis")
    .call(this.xAxis)
    .attr('transform', 'translate(0,' + this.height + ')')

  this.svg.append('g')
    .attr('class', 'y axis')
    .call(this.yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - this.margin.left)
    .attr('x', 0 - (this.height/2))
    .attr('dy', '.71em')
    .style('text-anchor', 'middle')
    .text('Fridge Temp (F)')

  this.svg.append("path")
    .datum(this.Data)
    .attr("class", "line")
    .attr("d", this.line);

}