function wiki(searchTerm) {
    $.ajax({
        url:'lookup.php',
        data:{search: $.trim(searchTerm).replace(/ /g,('_'))},
        success:function(response){
            var t = JSON.parse(response);
            var getProp = Object.keys(t.query.pages);
            $('body').html(t.query.pages[getProp[0]].extract)
        }
    })
}
