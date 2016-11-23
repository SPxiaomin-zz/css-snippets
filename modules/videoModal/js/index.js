$(function() {
    var showModalVideo = $('#js_show_modal_video');
    var modalVideoClose = $('#js_modal_video_close');

    var modalVideo = $('#js_modal_video');

    showModalVideo.on('click', function() {
        modalVideo.removeClass('f-dn');
    });

    modalVideoClose.on('click', function() {
        modalVideo.addClass('f-dn');
    });
});
