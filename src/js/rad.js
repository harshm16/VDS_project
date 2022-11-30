
// var leg = ["pI","W","k5","k4","k3","k2","k1"]

var leg = ["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7"]

var leg1 = ["Start","","","","","","End"]
let le = 0;
let le1 = 0;

function getdatafromfile(filename)  {
  var arraydata;
  $.ajax({
        type: "GET",
        url: filename,
        dataType: "text",
        async: false,
        success: function(csv) {arraydata = csv.split(/\r?\n|\r/); }
        });
  return arraydata;
  }
var temp = getdatafromfile("M8_BEB.out.csv");
var se = [];
for(let i = 0 ; i < temp.length;i++){
  var te = temp[i].split(",");
  se.push(te[1]);
}
console.log(se);
let co = 0;
let mouseover = function () {
        tooltip.style('opacity', 1)
        d3.select(this)
      }
      //tooltip
      
      let mousemove = function (d) {
        if(co == se.length){
          co = 0;
        }
        
        // console.log("S")
        // console.log(d.data)
        // console.log("S")

      //   tooltip.html('<i>Seq:</i> <b><span style="color:#DEDC00"> ' + se[co++] +'</span></b> <br><i>k1:</i> <b><span style="color:#DEDC00"> ' + d[0] + '</span></b> <br><i>k2:</i> <b><span style="color:#DEDC00"> ' + d[1] + '</span></b> <br><i>k3:</i> <b><span style="color:#DEDC00"> ' + Object.values(d.data)[2] + '</span></b>  <br><i>k3:</i> <b><span style="color:#DEDC00"> ' + Object.values(d.data)[3] + '</span></b>  <br><i>k4:</i> <b><span style="color:#DEDC00"> ' + Object.values(d.data)[4] + '</span></b>  <br><i>k5:</i> <b><span style="color:#DEDC00"> ' + Object.values(d.data)[5] + '</span></b>  <br><i>W:</i> <b><span style="color:#DEDC00"> ' + Object.values(d.data)[6] + '</span></b>  <br><i>pI:</i> <b><span style="color:#DEDC00"> ' + Object.values(d.data)[7] + '</span></b> \
      //  ')
      tooltip.html('<i>Seq:</i> <b><span style="color:#DEDC00"> ' + se[co++] +'</span></b> <br> <i>Omega:</i> <b><span style="color:#DEDC00"> ' + Object.values(d.data)[6] + '</span></b>  <br><i>Isometric Value:</i> <b><span style="color:#DEDC00"> ' + Object.values(d.data)[7] + '</span></b> <br><i>Most Common Class:</i> <b><span style="color:#DEDC00"> ' + (Math.floor(Math.random() * 7) + 1) + '</span></b> \
       ')

          .style('left', (d3.event.pageX + 70) + 'px')
          .style('top', (d3.event.pageY + 50) + 'px')
      }
  
      //tooltip
      let mouseleave = function () {
        tooltip.style('opacity', 0)
        d3.select(this)
      }

      let tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);


var svg = d3.select("#my"),
    // width = +svg.attr("width"),
    // height = +svg.attr("height"),
    width = 700,
    height = 705,
    innerRadius = 120,
    outerRadius = Math.min(width, height) / 3.5,
    g = svg.append("g").attr("transform", "translate(" + width / 3.5 + "," + height / 3.5 + ")").attr("class", "K");

var x = d3.scaleBand()
    .range([0, 2 * Math.PI])
    .align(0);

    

    
var y = d3.scaleRadial()
    .range([innerRadius, outerRadius]);

var z = d3.scaleOrdinal()
   .range(["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"]);

var rad_z = d3.scaleOrdinal()
.range ([ "#a37622", "#d46010", "#7670b2", "#e22b8a", "#69a625", "#e2ab18", "#2e9e77", "#666666","#eaeeec"]);

d3.csv("data.csv", function(d, i, columns) {
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.State; }));
  y.domain([0, d3.max(data, function(d) { return d.total; })]);
  rad_z.domain(data.columns.slice(1));

  g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(data.columns.slice(1))(data))
    .enter().append("g")
      .attr("fill", function(d) { return rad_z(d.key); })
    .selectAll("path")
    .data(function(d) { return d; })
    .enter().append("path")
      .attr("d", d3.arc()
          .innerRadius(function(d) { return y(d[0]); })
          .outerRadius(function(d) { return y(d[1]); })
          .startAngle(function(d) { return x(d.data.State); })
          .endAngle(function(d) { return x(d.data.State) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))
          .on('mouseover', mouseover)//tooltip
    .on('mousemove', mousemove)//tooltip
    .on('mouseleave', mouseleave);//tooltip;

  var label = g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) { return "rotate(" + ((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)"; });

  label.append("line")
      .attr("x2", -5)
      .attr("stroke", "#000");

  var yAxis = g.append("g")
      .attr("text-anchor", "middle");

  var yTick = yAxis
    .selectAll("g")
    .data(y.ticks(5).slice(1))
    .enter().append("g");

  yTick.append("circle")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("r", y);

  yTick.append("text")
      .attr("y", function(d) { return -y(d); })
      .attr("dy", "0.35em")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 5)
      .text(y.tickFormat(5, "s"));

  yTick.append("text")
      .attr("y", function(d) { return -y(d); })
      .attr("dy", "0.35em")
      .text(y.tickFormat(5, "s"));

  yAxis.append("text")
      .attr("y", function(d) { return -y(y.ticks(5).pop()); })
      .attr("dy", "-1em")
      .text("Variability scores");



  var legend = g.append("g")
    .selectAll("g")
    .data(data.columns.slice(1).reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(-40," + (i - (data.columns.length - 1) / 2) * 20 + ")"; });

  legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", rad_z);

  legend.append("text")
  .attr("x",20)
  .attr("y", 9)
  .attr("dy", "0.35em")
  .text(function(d) { return leg[le++]; });

 
    // legend.append("rect")
    //   .attr("x", 450)
    //   .attr("y", 5)
    //   .attr("width", 18)
    //   .attr("height", 18)
    //   .attr("fill", z);

    //   legend.append("text")
    //   .attr("x", 400)
    //   .attr("y", 5)
    //   .attr("dy", "0.35em")
    //   .text(function(d) { return leg1[le1++]; });


});
