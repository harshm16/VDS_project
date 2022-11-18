let l  = new Array();
let inp;
let lSize;
let showFlag = 0;
let temperatureFactor = new Array();

function tableFunction(){
    var table = document.createElement('table');
    table.setAttribute('border-collapse', 'collapse');
    table.setAttribute('background-color','#96D4D4');
    var row = table.insertRow(0);
    lSize = l.length;
    for(let i = 0 ; i< l.length;i++){
        var cell = row.insertCell(i-1);
        cell.setAttribute('align','center');
        cell.appendChild(document.createTextNode(l[i-1]));
    }
    // document.getElementById("SW").appendChild(table);
    barChart();

    // document.getElementById("SW").appendChild(chart);


    $(".ruler[data-items]").each(function() {
        var ruler = $(this).empty(),
            len = Number(ruler.attr("data-items")) || -1,
            item = $(document.createElement("li")),
            i;
            console.log(lSize);
        for (i = 0; i < l.length; i++) {
            if((i+1) % 5 == 0){
                ruler.append(item.clone().text(i + 1));
            }
            else{
                ruler.append(item.clone().text(" "));
            }
        }
    });

     function changeRulerSpacing(spacing) {
        $(".ruler").
          css("padding-right", spacing).
          find("li").
            css("padding-left", spacing);
    }
    $("#spacing").change(function() {
        changeRulerSpacing($(this).val());
    });
};

function pdbInput(){
    inp = document.getElementById("myText").value;
}

function ndGraph(){
    
    var margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = 700 - margin.left - margin.right  
    , height = 375 - margin.top - margin.bottom; 

    var n = temperatureFactor.length;

    let tooltip = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

    var xScale = d3.scaleLinear()
    .domain([0, n-1]) 
    .range([0, width]);

    var yScale = d3.scaleLinear()
    .domain([0, 1]) 
    .range([height, 0]); 

    var line = d3.line()
    .x(function(d, i) { return xScale(i); }) 
    .y(function(d) { return yScale(d.y); }) 
    .curve(d3.curveMonotoneX) 

    var dataset = [];
    for(let i = 0; i< temperatureFactor.length;i++){
        dataset.push({"y":(temperatureFactor[i]/100)});
    }


    
    //tooltip
    let mouseover = function () {
        tooltip.style('opacity', 1)
        d3.select(this)
      }
      //tooltip
      let mousemove = function (d) {
        tooltip.html('<i>Amino Acid:</i> <b><span style="color:#DEDC00"> ' + l[temperatureFactor.indexOf(d.y*100)] + '</span></b> <br>\
        <i>Temperature factor:<i> <b><span style="color:#DEDC00">' + d.y + '</span></b>')
          .style('left', (d3.event.pageX - 50) + 'px')
          .style('top', (d3.event.pageY - 50) + 'px')
      }
  
      //tooltip
      let mouseleave = function () {
        tooltip.style('opacity', 0)
        d3.select(this)
      }

    console.log(dataset);
    var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); 

    svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); 

    svg.append("path")
    .datum(dataset) 
    .attr("class", "line") 
    .attr("d", line);  

    svg.selectAll(".dot")
    .data(dataset)
    .enter().append("circle") 
    .attr("class", "dot") 
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
    .on('mouseover', mouseover)//tooltip
    .on('mousemove', mousemove)//tooltip
    .on('mouseleave', mouseleave);//tooltip
}


function myFunction() {
    // inp = document.getElementById("myText").value;
    var x = parseInt(document.getElementById("myText1").value) ;
    var y = parseInt(document.getElementById("myText2").value) ;
    var li = []
    for (let i = x; i < y + 1; i++) {
            li.push(i);
    }
    console.log(li);
    let element = $('#container-01');
    let init = 0;
    let flag = true;
    var count = 0;
    let config = { backgroundColor: 'black' };
    let viewer = $3Dmol.createViewer( element, config );
    let colorAsSnake = function(atom) {
        if(flag){
            flag = false;
            init = atom.resi;
        }
        l[count] = " " + atom.resn + " ";
        temperatureFactor[count] = atom.b;
        count += 1;
        console.log(atom.resi);
        return li.includes(atom.resi) ? 'white' : 'green';
    };
    $3Dmol.download("PDB-samples/sample.pdb",viewer,{},function(){
    // viewer.setStyle({chain: 'A', within:{distance: 10, sel:{chain: 'B'}}}, {sphere:{}});
    viewer.setHoverable({},true,function(atom,viewer,event,container) {
    if(!atom.label) {
        atom.label = viewer.addLabel(atom.resn+":"+atom.atom,{position: atom, backgroundColor: 'mintcream', fontColor:'black'});
    }},
    function(atom) {
        if(atom.label) {
            viewer.removeLabel(atom.label);
            delete atom.label;
    }});
    viewer.setStyle({chain: 'A'}, {cartoon: {colorfunc: colorAsSnake}});
    viewer.render();
    console.log(temperatureFactor);
    
    if(showFlag == 0){
        ndGraph();
        tableFunction();
        showFlag = 1;
    }
    });
};


function barChart(){
   


    var margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = 10000 - margin.left - margin.right  
    , height = 275 - margin.top - margin.bottom; 

    var n = l.length;

    let tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);



    var dataset = [];
    for(let i = 0; i< l.length;i++){
        dataset.push({"y":(l[i] + "-" + i)});
    }

     
    console.log("asddsyah");
    console.log(dataset);
    console.log("asddsyah");

    var xScale = d3.scaleBand()
    .domain(dataset.map(d => d.y))
    .range([0, width])
    .padding(5);

    var yScale = d3.scaleLinear()
    .domain([0, 1]) 
    .range([height, 0]); 
    
    //tooltip
    let mouseover = function () {
        tooltip.style('opacity', 1)
        d3.select(this)
      }
      //tooltip
      let mousemove = function (d, i) {
        tooltip.html('<i>Index:</i> <b><span style="color:#DEDC00"> ' + i + '</span></b> <br>\
        <i>Amino Acid:</i> <b><span style="color:#DEDC00"> ' + l[i] + '</span></b>  <br>\
        <i>Temperature factor:<i> <b><span style="color:#DEDC00">' + temperatureFactor[i] + '</span></b>')
          .style('left', (d3.event.pageX - 50) + 'px')
          .style('top', (d3.event.pageY - 50) + 'px')
      }
  
      //tooltip
      let mouseleave = function () {
        tooltip.style('opacity', 0)
        d3.select(this)
      }

    // console.log(dataset);
    var svg = d3.select("#SW").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
    const xAxisTickFormat = number => number.replace(/-/, '').replace(/[0-9]/g, '');

    // const xAxis = d3.axisBottom(xScale).tickFormat(function(d, i){
    //     return "Year" + d //"Year1 Year2, etc depending on the tick value - 0,1,2,3,4"
    // });

    const xAxis = d3.axisBottom(xScale).tickFormat(xAxisTickFormat);

    svg.append("g")
    .style("font", "15px times")
    .call(xAxis)
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    // .call(d3.axisBottom(xScale))
    
    .selectAll('.domain, .tick line')
    .remove(); 

    svg.append("g")
    .attr("class", "y axis")
    // .call(d3.axisLeft(yScale)); 

    svg.append("path")
    .datum(dataset);
    // .attr("class", "line") 
    // .attr("d", line);  

    svg.selectAll("bar")
    .data(dataset)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d,i) { return xScale(d.y) - 18; })
    .attr("y", function(d,i) { return yScale(0); })
    .attr("width", 40)
    .attr("height", 30)
    .attr("fill", "#FFFFFF")
    .attr("fill-opacity", 0)
    .attr('stroke', '#02412A')
    .attr('stroke-width', 3)


    // .enter().append("circle") 
    // .attr("class", "dot") 
    // .attr("cx", function(d, i) { return xScale(i) })
    // .attr("cy", function(d) { return yScale(d.y) })
    // .attr("r", 5)
    .on('mouseover', mouseover)//tooltip
    .on('mousemove', mousemove)//tooltip
    .on('mouseleave', mouseleave);//tooltip

}
