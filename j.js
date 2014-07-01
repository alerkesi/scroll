$(document).ready(function () {
    var openMap = function () {
        $('#js-map-popup').show();
    };

    /* change main item images when mouseEnter on little */
    var $littleImages = $('.js-littlePic');
    var $mainPic = $('.js-mainPic');
    var oldSrc = $mainPic.attr('src');
    var tempChangeMainPic = function (el) {
        $mainPic.hide();
        $mainPic.attr('src', $(el).find('img').attr('src'));
        $mainPic.fadeIn(300);
    };
    var restoreMainPic = function () {
        $mainPic.attr('src', oldSrc);
    };
    var changeMainPic = function (el) {
        $littleImages.removeClass('selected');
        $(el).addClass('selected');
        oldSrc = $(el).find('img').attr('src');
        $mainPic.attr('src', oldSrc);
    };

    $littleImages.mouseenter(function () {
        tempChangeMainPic(this)
    })
        .click(function(){
            changeMainPic(this)
        });
    $('.item-images').mouseleave(function () {
        restoreMainPic();
    });
    /* --- */

});
