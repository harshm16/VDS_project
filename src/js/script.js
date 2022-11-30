let l  = new Array();
let inp;
let lSize;
let showFlag = 0;
let temperatureFactor = new Array();
let count = 0;


function tableFunction(){
    var table = document.createElement('table');
    table.setAttribute('border-collapse', 'collapse');
    table.setAttribute('background-color','#96D4D4');
    table.setAttribute('id','myTable');
    var row = table.insertRow(0);
    lSize = l.length;
    for(let i = 0 ; i< l.length;i++){
        var cell = row.insertCell(i-1);
        cell.setAttribute('align','center');
        cell.setAttribute('size','10px');
        cell.appendChild(document.createTextNode(l[i-1]));
    }
    // console.log(l)
    // document.getElementById("SW").appendChild(table);

    $(".ruler[data-items]").each(function() {
        var ruler = $(this).empty(),
            len = Number(ruler.attr("data-items")) || -1,
            item = $(document.createElement("li")),
            i;
            //this.change(5);
            // console.log(lSize);
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

function ndGraph(data){
    
    var margin = { top: 0, right: 30, bottom: 40, left: 250 },
    width = 460 - margin.right,
    height = 270 - margin.top - margin.bottom;


    min = d3.min(data);
    max = d3.max(data);
    domain = [min,max];

    bin_count = 5;  


    var x = d3
        .scaleLinear()
        .domain(domain)
        .range([0, width]);

    var histogram = d3
        .histogram()
        .domain(x.domain()) 
        .thresholds(x.ticks(bin_count)); 


    var bins = histogram(data);


    var svg = d3
    .select("#SE")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .call(g => g.append("text")
            .attr("x", 376)
            .attr("y", 31)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .attr("style", "font-size: 1rem")
            .text("Temperature Factor %"));

    var y = d3
        .scaleLinear()
        .range([height, 0])
        .domain([
        0,
        d3.max(bins, function(d) {
            return d.length;
        })
        ]);
    
    svg.append("g").call(d3.axisLeft(y))
        .call(g => g.append("text")
            .attr("x", -110)
            .attr("y", 170)
            .attr("fill", "black")
            .attr("style", "font-size: 1rem")
            .attr("text-anchor", "start")
            .text("Frequency"));


        
    var tooltip = d3.select("body")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("color", "white")
    .style("border-radius", "5px")
    .style("padding", "10px")

    var showTooltip = function(d) {
        tooltip
        .transition()
        .duration(100)
        .style("opacity", 1)
        tooltip
        .html('<i>Range:</i> <b><span style="color:#DEDC00"> ' + d.x0 + " - " + d.x1 + "%" + '</span></b> <br>\
        <i>Frequency:<i> <b><span style="color:#DEDC00">' + d.length + '</span></b>')



        .style('left', (d3.event.pageX + 100) + 'px')
        .style('top', (d3.event.pageY -0) + 'px')
    }
    var moveTooltip = function(d) {
        tooltip
        .style('left', (d3.event.pageX + 100) + 'px')
        .style('top', (d3.event.pageY - 0) + 'px')
    }


    var hideTooltip = function(d) {
        tooltip
        .transition()
        .duration(100)
        .style("opacity", 0);

    
    }

    var color = "#6C0BA9"
        
    svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", 1)
    .attr("transform", function(d) {
        return "translate(" + x(d.x0) + "," + y(d.length) + ")";
    })
    .attr("width", function(d) {
        return x(d.x1) - x(d.x0) - 1;
    })
    .attr("height", function(d) {
        return height - y(d.length);
    })
    .style("fill", color)
    // Show tooltip on hover
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip );

    }
    



function myFunction(x, y) {

    if (x === undefined) {
        x = parseInt(document.getElementById("myText1").value) ;
    }
    if (y === undefined) {
        y = parseInt(document.getElementById("myText2").value) ;
    }

    // inp = document.getElementById("myText").value;
    // var x = parseInt(document.getElementById("myText1").value) ;
    // var y = parseInt(document.getElementById("myText2").value) ;
    var li = []
    for (let i = x; i < y + 1; i++) {
            li.push(i);
    }
    // console.log(li);
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
        // console.log(atom.resi);
        return li.includes(atom.resi) ? 'red' : 'green';
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


    ////////////////////////////////////////////////////
    
    
    if(showFlag == 0){
        // ndGraph();
        ndGraph(temperatureFactor);
        tableFunction();
        barChart(0)
        // document.addEventListener('click', function (event) {
        //     if (!event.target.matches('.bar')) return;
            
        //     console.log(event.target);
        // }, false);




        showFlag = 1;
    }
    

    
    });
    // let element1 = $('#container-02');
    // let init1 = 0;
    // let flag1 = true;
    // var count1 = 0;
    // let config1 = { backgroundColor: 'black' };
    // let viewer1 = $3Dmol.createViewer( element1, config1 );
    // let partitions = Math.round(211/9);
    // let color_count = 0;
    // let colors_scale = ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"];
    // let colorAsSnake1 = function(atom) {
    //     if(flag){
    //         flag = false;
    //         init = atom.resi;
    //     }

    //     if(count1 == partitions){
    //         count1 = 0;
    //         color_count++;
    //         return colors_scale[color_count];
    //     }
    //     count1++;
    //     return colors_scale[color_count];
    //     // l[count] = " " + atom.resn + " ";
    //     // temperatureFactor[count] = atom.b;
    //     // count += 1;
    //     // console.log(atom.resi);
    //     // return li.includes(atom.resi) ? 'white' : 'green';
    // };
    // $3Dmol.download("PDB-samples/sample.pdb",viewer1,{},function(){
    //     // viewer.setStyle({chain: 'A', within:{distance: 10, sel:{chain: 'B'}}}, {sphere:{}});
    //     viewer1.setHoverable({},true,function(atom,viewer1,event,container) {
    //     if(!atom.label) {
    //         atom.label = viewer1.addLabel(atom.resn+":"+atom.atom,{position: atom, backgroundColor: 'mintcream', fontColor:'black'});
    //     }},
    //     function(atom) {
    //         if(atom.label) {
    //             viewer1.removeLabel(atom.label);
    //             delete atom.label;
    //     }});
    //     viewer1.setStyle({chain: 'A'}, {cartoon: {colorfunc: colorAsSnake1}});
    //     viewer1.render();

        
    // });

};

function barChart(instance){

    let arr_onclick = [];

    let tooltip = d3.select('#new_div').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);


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
        // .style('left', (event.ClientX - 700) + 'px')
        // .style('top', (event.ClientY - 555) + 'px')
        .style('left', (d3.mouse(this)[0] + 20) + 'px')
        .style('top', (d3.mouse(this)[1] + 40 ) + 'px');
    }

    //tooltip
    let mouseleave = function () {
        tooltip.style('opacity', 0)
        d3.select(this)
    }

    //clickevent
    let mouseclick = function (d, i) {

        
        count++;
        // console.log(count);
        if (count<3){
            arr_onclick[count] = i

            if (count === 1){
                var text1 = document.getElementById("myText1");

                text1.value= i;
            }

            if (count === 2){
                var text2 = document.getElementById("myText2");
        
                text2.value= i;
            }
        

            d3.select(this)
            .attr("fill", "red")
            .attr("fill-opacity", 0.5)
            .attr('stroke', '#880808')
            .attr('stroke-width', 5)
        }
        
        if (count === 2){

            for (let j = arr_onclick[1]; j < arr_onclick[2]; j++) {

      
                d3.select("#bar" + j)
                .attr("fill", "red")
                .attr("fill-opacity", 0.5)
                .attr('stroke', '#880808')
                .attr('stroke-width', 5);

              }

            myFunction(arr_onclick[1], arr_onclick[2]);

        }


    }

    if (instance === 0){
        var margin = {top: 50, right: 50, bottom: 50, left: 5}
        , width = 10000 - margin.left - margin.right  
        , height = 70 - margin.top - margin.bottom; 

        var n = l.length;

        var dataset = [];
        for(let i = 0; i< l.length;i++){
            dataset.push({"y":(l[i] + "-" + i)});
        }

        
        
        var xScale = d3.scaleBand()
        .domain(dataset.map(d => d.y))
        .range([0, width])
        .padding(5);

        var yScale = d3.scaleLinear()
        .domain([0, 1]) 
        .range([height, 0]); 



        // console.log(dataset);
        
        var svg = d3.select("#new_div").append("svg")
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
        .attr("id",function(d,i) { return "bar" + i })


        // .enter().append("circle") 
        // .attr("class", "dot") 
        // .attr("cx", function(d, i) { return xScale(i) })
        // .attr("cy", function(d) { return yScale(d.y) })
        // .attr("r", 5)
        .on('mouseover', mouseover)//tooltip
        .on('mousemove', mousemove)//tooltip
        .on("click", mouseclick)
        .on('mouseleave', mouseleave);//tooltip


    }

    else{

        count = 0

    }

};


function myreset() {

    var li = []
   
    // console.log(li);
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
        // console.log(atom.resi);
        return li.includes(atom.resi) ? 'red' : 'green';
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

    
    });

    var text1 = document.getElementById("myText1");

    text1.value= "";

    var text2 = document.getElementById("myText2");

    text2.value= "";


    const collection = document.getElementsByClassName("bar");

    // console.log("collection")
    // console.log(collection[0])

    // console.log("collection")
    
    for (let i = 0; i < collection.length; i++) {
        collection[i].setAttribute("fill", "#FFFFFF")
        collection[i].setAttribute("fill-opacity", 0)
        collection[i].setAttribute('stroke', '#02412A')
        collection[i].setAttribute('stroke-width', 3)
      }
      

    // count = 0;
    barChart(1)
    // d3.selectAll("bar")
    // .attr("fill", "#FFFFFF")
    // .attr("fill-opacity", 0)
    // .attr('stroke', '#02412A')
    // .attr('stroke-width', 3);

};

