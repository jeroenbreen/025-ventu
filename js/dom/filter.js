function filterListeners() {
    $('.ventu-filter-toggle').click(function(){
        $(this).toggleClass('ventu-filter-toggle-active');
    });
    // todo, collect data from model and inject in inputs
    //setFilter();
}

function openFilter(element) {
    var filter = $(element).parent();
    filter.addClass('filter-active');
    filter.find('.ventu-filter-summary').hide();
    filter.find('.ventu-filter-edit').addClass('hidden');
    filter.find('.ventu-filter-body').show();
}

function closeFilter(element, type) {
    var filter = $(element).parent().parent().parent();
    filter.removeClass('filter-active');
    filter.find('.ventu-filter-summary').show();
    filter.find('.ventu-filter-edit').removeClass('hidden');
    filter.find('.ventu-filter-body').hide();
    updateFilterSummary(filter, type);
}

function updateFilterSummary(filter, type) {
    var summary;
    switch (type) {
        case 'area':
            // update model
            ventu.service.filter.area.min = checkFilterInput($('#ventu-filter-area-min').val());
            ventu.service.filter.area.max = checkFilterInput($('#ventu-filter-area-max').val());
            // update html
            summary = styleNumber(ventu.service.filter.area.min) + ' - ' + styleNumber(ventu.service.filter.area.max) + ' m²';
            break;
        case 'offer':
            // update model
            var offer = [];
            filter.find('.ventu-filter-toggle').each(function(){
                if ($(this).hasClass('ventu-filter-toggle-active')) {
                    var value = $(this).data('value');
                    offer.push(value);
                }
            });
            ventu.service.filter.offer = offer;
            // update html
            summary = offer.join(', ');
            
            break;
        case 'circle':
            var km = checkFilterInput($('#ventu-filter-circle').val());
            
            // update model and html
            if (km > 0) {
                ventu.service.filter.searchCircle.active = true;
                ventu.service.filter.searchCircle.km = km;
                summary = km + ' km';
            } else {
                ventu.service.filter.searchCircle.active = false;
                ventu.service.filter.searchCircle.km = 0;
                summary = 'Niet actief';
            }
            break;
    }
    filter.find('.ventu-filter-summary').html(summary);
    ventu.service.filterUpdate();
}

function checkFilterInput(input) {
    // todo check the input
    return input;
}

function styleNumber(input) {
    // todo place dots, more?
    return input;
}
