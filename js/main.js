
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
                        paper.setViewBox(-3,0,Math.ceil(paper_dino.getBBox().width) +10 ,Math.ceil(paper_dino.getBBox().height) + 10,true);
                        return false;
                    }
                });
            }
        });
    }
    $('body').on('click','.lookup',function(){
        $('.info').html('');
        paper.clear();
        loadDino($(this).data('name'));
        wiki($(this).data('name'));
    });
    function wiki(searchTerm) {
        $.ajax({
            url:'lookup.php',
            data:{search: $.trim(searchTerm).replace(/ /g,('_'))},
            success:function(response){
                 $('#dino-name').html(searchTerm);
                var t = JSON.parse(response);
                var getProp = Object.keys(t.query.pages);
                $('#summary').html(t.query.pages[getProp[0]].extract)
            }
        });
    }
});

