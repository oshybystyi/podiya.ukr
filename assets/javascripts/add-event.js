
(function($) {
    /** Set time later checkbox and input[type=text] reaction to it **/

    $('#set-time-later').bind('change', function() {
        toggleSetTimeLaterTarget($(this));
    });

    $('#time-later').bind('click', function() {
        /** when clicking on paragraph - transform it to input[type='text'] **/
        $('#set-time-later').prop('checked', false);
        toggleSetTimeLaterTarget()
            .focus();
    });

    toggleSetTimeLaterTarget();

    function toggleSetTimeLaterTarget(checkbox) {
        checkbox = checkbox || $('#set-time-later');

        var target = checkbox.data('target');
        if (checkbox.is(':checked')) {
            $(target + '-later').show();
            $(target).hide();
        } else {
            var targetDeffered = $(target).show();
            $(target + '-later').hide();

            return targetDeffered;
        }
    }
})(jQuery);
