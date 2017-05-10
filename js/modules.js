function initialiseModules() {
    $('.ventu-dialog').each(function(){
        new Dialog($(this));
    });

    $('.ventu-search').each(function(){
        // we want the search module initialis by hand
        // to add the custom callback
        if (!$(this).hasClass('initialise-manually')) {
            new Search($(this));
        }
    });

    $('.ventu-search-open').click(function(e){
        if ($(e.target).hasClass('ventu-search-open')) {
            $(this).toggleClass('ventu-search-open--opened');
        }
    })
}