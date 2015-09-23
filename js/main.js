var paper = Raphael($('#paper'),0,1500,1500 );
//var dinos = Array();
function loadDino(name,x,y) {
    $.ajax({
        type:"GET",
        url:'xml/dino.xml',
        dataType:'xml',
        success: function(response){
            $(response).find('dino').each(function(){
                if ($(this).attr('name') == name){
                    console.log($(this).children('path'));
                    paper.path($(this).children('path').text());
                    return false;
                }
            });
            console.log('after');
        }
    });
}

function drawDino(name) {
    var dino = $(xml).find('dino');
    console.log(dino);
}
var count = 0;
function recurseChildren (child, mat) {
    console.log(mat);
  
    var r = child.attr('transform');
    if (typeof r !== 'undefined') {
        if (r.indexOf('matrix') > -1) {
                    console.log(r);
            var e =r.replace(/\(|\)/g, '').replace('matrix','');
            e = e.split(',');
            console.log(e.length);
            //mat.add(
            //parseFloat(e[0]),
            //parseFloat(e[1]),
            //parseFloat(e[2]),
            //parseFloat(e[3]),
            //parseFloat(e[4]),
            //parseFloat(e[5])
            //);
            mat = Raphael.matrix(
            parseFloat(e[0]),
            parseFloat(e[1]),
            parseFloat(e[2]),
            parseFloat(e[3]),
            parseFloat(e[4]),
            parseFloat(e[5])
            );
            r = mat.toString();
            
        }
        r = r.replace(/\(|\)/g, '').replace('matrix','m').replace('translate','t').replace('scale','s')
        .replace('rotate','r');
    
    }else{
        r ='';
    }
  //  console.log(r);
 
    child.children().each(function(){
        var x;
        if ($(this).is('path')) {
            //if (r.indexOf('m') > -1) {
            //    mat =
            //    (typeof mat !== 'undefined') ?
            //    Raphael.matrix(r.replace('m',''))
            //                   : mat.addMatrix(r.replace('m',''));
            //    console.log(mat)
            //}

            x = paper.path($(this).attr('d')).transform(r);
            if ($(this).attr('transform')) {
                x.transform($(this).attr('transform').replace(/\(|\)/g, '').replace('matrix','m').replace('translate','t').replace('scale','s')
        .replace('rotate','r'));
            }
            if (r.indexOf('m') > -1) {
                m = x.matrix;
                //console.log('e');
            }
            //console.log(m);
          //r !=''  ?
          //console.log(x.matrix);
          //:paper.path($(this).attr('d'));
        }else if ($(this).children().length) {
            //console.log($(this).children());
           // if (++count <2) {
               // recurseChildren($(this), mat);
            //}
            
        }
    });

}
function loadSVG(args) {
    $.ajax({
        url: 'svg/fox.svg',
        dataType: 'xml',
        success: function(response){
            var child = $(response).find('g');
            var count = 0;
            child.each(function(){
                if (++count >4) {
                    return;
                }
                recurseChildren($(this), Raphael.matrix());
                
            });
            //console.log(child.children());
        }
    })
}