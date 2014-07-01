/* extend */
if ($.fn.hasOwnProperty('hide')) {
    var _oldhide = $.fn.hide;
    $.fn.hide = function (speed, callback) {
        $(this).trigger('hide');
        return _oldhide.apply(this, arguments);
    }
}
$(document).ready(function () {
    /* popup modules */
    var itemName = $('.js-item-name').text();
    $('.js-showPicturePopup').click(function () {
        var $popup = $('#picture-popup');
        var $cZoom = $popup.find('.content-zoom');
        var $cLeft = $popup.find('.content-left');
        var $cTitle =$popup.find('.title');
        openPopup($popup);
        var $picsList = $('#pictures-content .vert-scroll').clone();
        //stretch height within the window
        $picsList.find('.vert-scroll-tabs').css('height', $cLeft.height() - 60);
        var $mainPic = $('#pictures-content .js-mainPic').clone();
        $cTitle.text(itemName);
        $cLeft.append($picsList);
        $cZoom.append($mainPic);
        $('#picture-popup').bind('hide', function () {
            $cLeft.empty();
            $cTitle.text('');
            $cZoom.empty();
        });
    });

    var $popup = $('.popup');
    var $popupOut = $('.popup-out');
    $popupOut.click(function () {
        closePopup($(this));
    });
    document.onkeydown = function(e) {
        if (e.keyCode === 27) {closePopup($popupOut);}
    };
    $popup.
        on('click', '.popup-close', function () {
            closePopup($popupOut);
        })
        .on('click', function (e) {
            e.stopPropagation();
        });
    function openPopup($elem) {
        var $p = $elem.find('.popup');
        $p.show();
        $p.scrollTop($(window).scrollTop());
        $elem.fadeIn('slow');
        if (!document.body.classList.contains('noscroll')) {
            document.body.classList.add('noscroll');
        }
    }

    function closePopup($elem) {
        $elem.fadeOut('slow');
        if (document.body.classList.contains('noscroll')) {
            document.body.classList.remove('noscroll');
        }
    }

    /* ------ */

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
        .click(function () {
            changeMainPic(this)
        });
    $('.item-images').mouseleave(function () {
        restoreMainPic();
    });
    /* --- */

});
