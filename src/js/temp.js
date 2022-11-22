function myKo1() {
  let element = $('#container-03');
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
      return  'green';
  };
$3Dmol.download("PDB-samples/sample.pdb",viewer,{},function(){
    viewer.setBackgroundColor("black");
    var colorAsSnake = function(atom) {
      return atom.resi % 2 ? 'white': 'green'
    };

    //viewer.setStyle( {chain:'A'}, { cartoon: {colorfunc: colorAsSnake }});
    viewer.setStyle( {chain:'A'}, { line: {colorscheme: 'yellowCarbon'}});

    viewer.render();
});

      };

      function cross() {
        let element = $('#container-03');
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
            return  'green';
        };
      $3Dmol.download("PDB-samples/sample.pdb",viewer,{},function(){
          viewer.setBackgroundColor("black");
          var colorAsSnake = function(atom) {
            return atom.resi % 2 ? 'white': 'green'
          };
      
          //viewer.setStyle( {chain:'A'}, { cartoon: {colorfunc: colorAsSnake }});
          
            viewer.setStyle( {chain:'A'}, { cross: {colorscheme: 'yellowCarbon'}});
            viewer.render();
      
      });
};
function sphere() {
    let element = $('#container-03');
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
        return  'green';
    };
  $3Dmol.download("PDB-samples/sample.pdb",viewer,{},function(){
      viewer.setBackgroundColor("black");
      var colorAsSnake = function(atom) {
        return atom.resi % 2 ? 'white': 'green'
      };
  
      //viewer.setStyle( {chain:'A'}, { cartoon: {colorfunc: colorAsSnake }});
      
        viewer.setStyle( {chain:'A'}, { sphere: {colorscheme: 'yellowCarbon'}});
        viewer.render();
  
  });
};

function stick() {
    let element = $('#container-03');
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
        return  'green';
    };
  $3Dmol.download("PDB-samples/sample.pdb",viewer,{},function(){
      viewer.setBackgroundColor("black");
      var colorAsSnake = function(atom) {
        return atom.resi % 2 ? 'white': 'green'
      };
  
      //viewer.setStyle( {chain:'A'}, { cartoon: {colorfunc: colorAsSnake }});
      
        viewer.setStyle( {chain:'A'}, { stick: {colorscheme: 'yellowCarbon'}});
        viewer.render();
  
  });
};

function cartoon() {
    let element = $('#container-03');
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
        return  'green';
    };
  $3Dmol.download("PDB-samples/sample.pdb",viewer,{},function(){
      viewer.setBackgroundColor("black");
      var colorAsSnake = function(atom) {
        return atom.resi % 2 ? 'white': 'green'
      };
  
      //viewer.setStyle( {chain:'A'}, { cartoon: {colorfunc: colorAsSnake }});
      
        viewer.setStyle( {chain:'A'}, { cartoon: {colorscheme: 'yellowCarbon'}});
        viewer.render();
  
  });
};




    