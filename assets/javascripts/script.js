
(function($) {
    $('#set-time-later').bind('change', function() {
        toggleSetTimeLaterTarget($(this));
    });

    function toggleSetTimeLaterTarget(checkbox) {
        checkbox = checkbox || $('#set-time-later');

        var target = checkbox.data('target');
        if (checkbox.is(':checked')) {
            $(target + '-later').hide();
            $(target).show();
        } else {
            $(target).hide();
            $(target + '-later').show();
        }
    }
})(jQuery);
