
(function($, window) {

    $('a.lightbox').colorbox({
        maxHeight: '90%', // resize for viewport
        maxWidth: '90%', // resize for viewport
        closeButton: false, // hide close button
        onComplete: function() {
            $('#colorbox:not(.close-event-attached)')
                .bind('click', function(ev) {
                    ev.preventDefault();
                    $('a.lightbox').colorbox.close();
                })
                .addClass('close-event-attached');
        }
    });

})(jQuery, window);
