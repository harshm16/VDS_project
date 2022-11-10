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
    console.log(l)
    document.getElementById("SW").appendChild(table);

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

