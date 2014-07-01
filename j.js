$(document).ready(function () {
    /* popup modules */

    $('.js-showPicturePopup').click(function () {
        var $popup = $('#picture-popup');

        openPopup($popup);
        var $picsContent = $('#pictures-content').clone();

        $popup.find('.content').append($picsContent);
        var $littleImages = $('.js-littlePic');
        var $mainPic = $('.js-mainPic');
        var oldSrc = $mainPic.attr('src');
        $littleImages.mouseenter(function () {
            tempChangeMainPic(this)
        })
            .click(function(){
                changeMainPic(this)
            });
        $('.item-images').mouseleave(function () {
            restoreMainPic();
        });
    });

    var $popup = $('.popup');
    var $popupOut = $('.popup-out');
    $popupOut.click(function () {
        closePopup($(this));
    });
    $popup.
        on('click', '.popup-close', function () {
            closePopup($popupOut);
        })
        .on('click', function(e){
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
        .click(function(){
            changeMainPic(this)
        });
    $('.item-images').mouseleave(function () {
        restoreMainPic();
    });
    /* --- */

});
