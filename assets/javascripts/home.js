
(function($, window) {
    $('#city-selector').bind('change', function() {
        window.location = '/' + $(this).val();
    });
})(jQuery, window);
