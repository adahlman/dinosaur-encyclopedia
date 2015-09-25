$(document).ready(function(){
    var paper = Raphael('paper',$('#paper').width(),$('#paper').height());
    $.ajax({
        type: 'GET',
        url: 'xml/dino.xml',
        dataType:'xml',
        success:function(xml){
            var alphaArray = new Array();
            $(xml).find('dino').each(function(){
                alphaArray.push($(this).attr('name'));
            });
            // put names in alphabetical order
            for(var i = 0; i < alphaArray.sort().length; i++){
                $('#dino-list').append(
                       '<li class="lookup" data-name="'+alphaArray[i]+'">'+alphaArray[i]+'</li>'
                       );
            }
        }
    });
    function loadDino(name) {
        $.ajax({
            type:"GET",
            url:'xml/dino.xml',
            dataType:'xml',
            success: function(response){
                $(response).find('dino').each(function(){
                    if ($(this).attr('name') == name){
                         paper_dino = paper.path($(this).children('path').text())
                        .attr({fill:'#000'});
                        // change viewbox so dinosaur takes up all of the box regardless of original vector size
                        paper.setViewBox(-3,0,Math.ceil(paper_dino.getBBox().width) +10 ,Math.ceil(paper_dino.getBBox().height) + 10,true);
                        return false;
                    }
                });
            }
        });
    }
    $('body').on('click','.lookup',function(){
        // clear everything before we start loading a new dinosaur
        $('.info').html(''); 
        paper.clear();
        loadDino($(this).data('name'));
        wiki($(this).data('name'));
    });
    function wiki(searchTerm) {
        $.ajax({
            url:'lookup.php',
            data:{search: $.trim(searchTerm).replace(/ /g,('_'))}, //in case name is more than one word or has trailing/leading whitespace
            success:function(response){
                 $('#dino-name').html(searchTerm); // fill in title
                var t = JSON.parse(response);
                var getProp = Object.keys(t.query.pages); // property containing info is variable. chage to array so we can grab the first one
                $('#summary').html(t.query.pages[getProp[0]].extract); // write in only the summary from wikipedia
            }
        });
    }
});
