function initialiseModals() {
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            closePopups();
        }
    });

    $('.ventu-close-popup').click(function(){
        closePopups();
    });
}

function openAddMemberPopup() {
    $('.ventu-overlay').fadeIn(100, function(){
        $('.ventu-hangout-add-member').fadeIn(100)
    })
}

function closePopups() {
    $('.ventu-popup').fadeOut(100, function(){
        $('.ventu-overlay').fadeOut(100);
    });
}