let seqli  = new Array();
function myKo() {
  let element1 = $('#container-02');
    let init1 = 0;
    let flag1 = true;
    var count1 = 0;
    var counter = 0;
    let config1 = { backgroundColor: 'black' };
    let viewer1 = $3Dmol.createViewer( element1, config1 );
    let partitions = Math.round(211/9);
    let color_count = 8;
    let colors_scale = ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"];
    let colorAsSnake1 = function(atom) {
        if(count1 == partitions){
            count1 = 0;
            color_count--;
            return colors_scale[color_count];
        }
        count1++;
        return colors_scale[color_count];
    };
    $3Dmol.download("PDB-samples/sample.pdb",viewer1,{},function(){
        viewer1.setHoverable({},true,function(atom,viewer1,event,container) {
        if(!atom.label) {
            atom.label = viewer1.addLabel(atom.resn+":"+atom.atom,{position: atom, backgroundColor: 'mintcream', fontColor:'black'});
        }},
        function(atom) {
            if(atom.label) {
                viewer1.removeLabel(atom.label);
                delete atom.label;
        }});
        viewer1.setStyle({chain: 'A'}, {cartoon: {colorfunc: colorAsSnake1}});
        viewer1.render();
        
    });
};

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
// var s = [' ASN ', ' ILE ', ' HIS ', ' ILE ', ' ARG ', ' PHE ', ' VAL ', ' GLN ', ' SER ', ' TRP ', ' PRO ', ' PRO ', ' ILE ', ' TYR ', ' CYS ', ' THR ', ' ASP ', ' GLU ', ' ARG ', ' VAL ', ' GLY ', ' ILE ', ' THR ', ' CYS ', ' TYR ', ' ARG ', ' LYS ', ' VAL ', ' GLN ', ' SER ', ' LYS ', ' PHE ', ' TYR ', ' THR ', ' HIS ', ' GLY ', ' LEU ', ' TRP ', ' THR ', ' ALA ', ' ASP ', ' SER ', ' ALA ', ' GLY ', ' PHE ', ' SER ', ' LEU ', ' GLU ', ' ASN ', ' CYS ', ' LYS ', ' THR ', ' LYS ', ' VAL ', ' TYR ', ' PRO ', ' ASP ', ' MET ', ' LEU ', ' ALA ', ' ASN ', ' LYS ', ' LEU ', ' GLU ', ' SER ', ' LEU ', ' LEU ', ' ASP ', ' ALA ', ' ARG ', ' ILE ', ' VAL ', ' VAL ', ' LYS ', ' LEU ', ' GLN ', ' SER ', ' ASN ', ' TRP ', ' PRO ', ' SER ', ' ILE ', ' ASP ', ' THR ', ' ASP']
var seq = []
for(let i = 1;i < se.length;i++){
    if(!seq.includes(se[i])){
        seq.push(se[i]);
    }
}
const graph = {
    "nodes":[],
    "links":[]
}
console.log(seq)
for(let i = 0 ; i < seq.length;i++){
    var temp = { "id":seq[i],"chapters":["1"],"name":seq[i]};
        graph.nodes.push(temp)
}
for(let i = 1 ; i < se.length-1;i++){
    var temp1 = { "source":se[i],"target":se[i+1],"chapters":["1"]};
        graph.links.push(temp1)
    
}
console.log(graph);


var i, j, node;
var groupSep = 10;

var nodeRadius = d3.scaleSqrt().range([3, 7]);

var linkWidth = d3.scaleLinear().range([1.5, 2 * nodeRadius.range()[0]]);

var margin = {
  top: nodeRadius.range()[1] + 1,
  right: nodeRadius.range()[1] + 1,
  bottom: nodeRadius.range()[1] + 1,
  left: nodeRadius.range()[1] + 1
// top: 70, right: 20, bottom: 20, left: 80
};

var width = 600 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

var x = d3.scaleLinear().range([0, width]);

var svg = d3.select('#mySVG')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.json("jeans.json", function (error, gr) {
  if (error) throw error;

  var idToNode = {};

  graph.nodes.forEach(function (n) {
    idToNode[n.id] = n;
  });

  graph.links.forEach(function (e) {
    e.source = idToNode[e.source];
    e.target = idToNode[e.target];
  });

  graph.nodes.forEach(function (n) {
    n.chapters = n.chapters.map(function (chaps) { return chaps.split('.').map(function (c) { return parseInt(c); }); });
    n.chapters.sort(chapterCompare).reverse();
    n.firstChapter = n.chapters[0];
  });
  graph.nodes.sort(function (a, b) {
    return chapterCompare(a.firstChapter, b.firstChapter);
  }).reverse();

  for (i = 0, j = 0; i < graph.nodes.length; ++i) {
    node = graph.nodes[i];
    if (i > 0 && graph.nodes[i-1].firstChapter[0] != node.firstChapter[0]) ++j;
    node.x = j * groupSep + i * (width - 4 * groupSep) / (graph.nodes.length - 1);
    node.y = height;
  }

  nodeRadius.domain(d3.extent(graph.nodes, function (d) { return d.chapters.length; }));

  linkWidth.domain(d3.extent(graph.links, function (d) { return d.chapters.length; }));
  let colors_scale = ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"];
  let counter = 0;
  var link = svg.append('g')
    .attr('class', 'links')
    .selectAll('path')
    .data(graph.links)
    .enter().append('path')
    .attr('d', function (d) {
      return ['M', d.source.x, height, 'A',
        (d.source.x - d.target.x)/2, ',',
        (d.source.x - d.target.x)/2, 0, 0, ',',
        d.source.x < d.target.x ? 1 : 0, d.target.x, ',', height]
        .join(' ');
    })
    .attr('stroke-width', function (d) { return linkWidth(d.chapters.length); })
    // .style('stroke',function (d) { return colors_scale[6]; })
    .on('mouseover', function (d) {
      link.style('stroke', null);
      d3.select(this).style('stroke', '#d62333');
      node.style('fill', function (node_d) {
        return node_d === d.source || node_d === d.target ? 'black' : null;
      });
    })
    .on('mouseout', function (d) {
      link.style('stroke', null);
      node.style('fill', null);
    });

  var node = svg.append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(graph.nodes)
    .enter().append('circle').text(function (d) { return d.name + ' - ' ; })
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; })
    .attr('r', function (d) { return nodeRadius(d.chapters.length); })
    .on('mouseover', function (d) {
      node.style('fill', null);
      d3.select(this).style('fill', 'black');
      var nodesToHighlight = graph.links.map(function (e) { return e.source === d ? e.target : e.target === d ? e.source : 0})
        .filter(function (d) { return d; });
      node.filter(function (d) { return nodesToHighlight.indexOf(d) >= 0; })
        .style('fill', '#555');
      link.style('stroke', function (link_d) {
        return link_d.source === d | link_d.target === d ? '#d62333' : null;
      });
    })
    .on('mouseout', function (d) {
      node.style('fill', 'red');
      link.style('stroke', null);
    });

  node.append('title').text(function (d) { return d.name; });

  function chapterCompare (aChaps, bChaps) {
    if (aChaps[0] != bChaps[0])
      return bChaps[0] - aChaps[0];
    else if (aChaps[1] != bChaps[0])
      return bChaps[1] - aChaps[1];
    else if (aChaps[2] != bChaps[2])
      return bChaps[2] - aChaps[2];
    return 0;
  }
});

document.write("<br>");
for(let i = seq.length - 1; i > -1; i--){
        var h1 = document.createElement('h6');
        h1.textContent =seq[i] + " ";
        h1.setAttribute('class', 'note');
        document.body.appendChild(h1);
        h1.style.wordSpacing = "25px";
        
}
