let l  = new Array();
let inp;
let lSize;
let showFlag = 0;
let temperatureFactor = new Array();

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

