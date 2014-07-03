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
        var $cTitle = $popup.find('.title-big');
        openPopup($popup);

        var $picsList = $('#pictures-content .vert-scroll').clone();
        var $mainPic = $('#pictures-content .js-mainPic').clone();
        //$cTitle.text(itemName);
        $cLeft.append($picsList);
        $cZoom.append($mainPic);
        $popup.on('hide', function () {

            $cLeft.empty();
            $cTitle.text('');
            $cZoom.empty();
        });
        setMouseenterOnLittlePic(document.getElementById('picture-popup'));
        checkZoomable();
        setDragArea();
        $(window).resize(function () {
            checkZoomable();
            setDragArea();
            resetZoomed();
            $cZoom.unbind();
            $(self).css({
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%'
            })
        });
        $mainPic.on('change-src', function () {
            checkZoomable();
        });
        $cZoom.find('.js-mainPic.isZoomable').click(function () {
            var self = this;
            if ($(self).hasClass('zoomed')) {
                resetZoomed();
            } else {
                $(self).addClass('zoomed');
                $cZoom.mousemove(function (event) {
                    var xPerc = -(event.pageX - $cZoom.dragArea.posX) / $cZoom.dragArea.width * 100,
                        yPerc = -(event.pageY - $cZoom.dragArea.posY) / $cZoom.dragArea.height * 100;
                    if ($(self).hasClass('zoom-v') && $(self).hasClass('zoom-h')) {
                        $(self).css({
                            transform: 'translate(' + xPerc + '%,' + yPerc + '%)'
                        });
                    } else if ($(self).hasClass('zoom-h')) {
                        $(self).css({
                            transform: 'translate(' + xPerc + '%,-50%)'
                        });
                    } else if ($(self).hasClass('zoom-v')) {
                        $(self).css({
                            transform: 'translate(-50%, ' + yPerc + '%)'

                        });
                    }
                })
            }
        });
        function resetZoomed(){
            $('.js-mainPic.isZoomable').removeClass('zoomed');
            $cZoom.unbind();
            $('.js-mainPic.isZoomable').css({
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%'
            })
        }
        function checkZoomable(){
            var mainPic = $mainPic[0];
            $mainPic.wK = mainPic.naturalWidth / $cZoom.width() || 1;
            $mainPic.hK = mainPic.naturalHeight / $cZoom.height() || 1;
            $mainPic.toggleClass('zoom-v', mainPic.naturalHeight > $cZoom.height());
            $mainPic.toggleClass('zoom-h', mainPic.naturalWidth > $cZoom.width());
            if (mainPic.naturalHeight > $cZoom.height() || mainPic.naturalWidth > $cZoom.width()) {
                $mainPic.addClass('isZoomable');
            } else $mainPic.removeClass('isZoomable')
        }
        function setDragArea(){
            $cZoom.dragArea = {
                height: $cZoom.height(),
                width: $cZoom.width(),
                posX: getOffsetRect($cZoom[0]).left,
                posY: getOffsetRect($cZoom[0]).top,
                curPosX: event.pageX - $cZoom[0].posX,
                curPosY: event.pageY - $cZoom[0].posY
            };
        }
        function getOffsetRect(elem) {
            // (1)
            var box = elem.getBoundingClientRect();

            // (2)
            var body = document.body;
            var docElem = document.documentElement;

            // (3)
            var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
            var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

            // (4)
            var clientTop = docElem.clientTop || body.clientTop || 0;
            var clientLeft = docElem.clientLeft || body.clientLeft || 0;

            // (5)
            var top = box.top + scrollTop - clientTop;
            var left = box.left + scrollLeft - clientLeft;

            return { top: Math.round(top), left: Math.round(left) }
        }



    });

    var $popup = $('.popup');
    var $popupOut = $('.popup-out');
    $popupOut.click(function () {
        closePopup($(this));
    });
    document.onkeydown = function (e) {
        if (e.keyCode === 27) {
            closePopup($popupOut);
        }
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
    setMouseenterOnLittlePic(document.getElementById('pictures-content'));
    var $footBody = $('footer.footer').find('.footer-body');
    $('footer.footer').on('click', '.close',function () {
        $footBody.slideUp(400);
    }).on('click', '.footer-tab', function () {
            $footBody.slideDown(400);
        });
    $('.catalog__item__name').text(function () {
        return this.text.ellipsis(50);
    });
    toggleTab();
});
/* change main item images when mouseEnter on little */


var setMouseenterOnLittlePic = function (container) {

    var $littleImages = $(container).find('.js-littlePic');
    var $mainPic = $(container).find('.js-mainPic');
    var $imagesScrollArea = $(container).find('.item-images');
    var oldSrc = $mainPic.attr('src');
    var tempChangeMainPic = function (el) {
        $mainPic.css({display: 'none'});
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
        $($mainPic).trigger('change-src');
    };

    $littleImages.mouseenter(function (e) {
        e.stopPropagation();
        tempChangeMainPic(this);
    })
        .click(function () {
            changeMainPic(this)
        });
    $imagesScrollArea.mouseleave(function () {
        restoreMainPic();
    });
};
String.prototype.ellipsis = function (maxLength) {
    return this.length > maxLength ? this.substr(0, maxLength - 3) + '...' : this;
};
var toggleTab = function () {
    $('.tab-menu li').click(function () {
        var clMenu = $(this).closest('.tab-menu'),
            clContent = clMenu.next('.tabs-content');
        clMenu.children('li').removeClass('selected');
        clContent.children('li').removeClass('selected');
        $(this).addClass('selected');
        var targetTabContent = clContent.children("[data-tab-id$='" + this.id + "']");
        targetTabContent.addClass('selected');

    })
};

/* Catalog scroller */
var horizScrolls = $('.horiz-scroll-line');

horizScrolls.on('.arrow-back', 'click', function () {
    right();
});
horizScrolls.on('.arrow-forward', 'click', function () {
    left();
});

horizScrolls.each(function (index, self) {
    self.catalog = $(self).find('.horiz-scroll-catalog');
    self.tabs = $(self).find('.catalog__item');
    self.delta = self.tabs.outerWidth(true);
    self.tabsWidth = self.tabs.length * self.delta;
    self.tabMenu = parseInt($(self).find('.horiz-scroll-tabs').width() / self.delta) * self.delta;
    if (self.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+
            self.addEventListener("wheel", bindScroll, false);
        } else if ('onmousewheel' in document) {
            // ���������� ������� �������
            self.addEventListener("mousewheel", bindScroll, false);
        } else {
            // 3.5 <= Firefox < 17, ����� ������ ������� DOMMouseScroll ���������
            self.addEventListener("MozMousePixelScroll", bindScroll, false);
        }
    } else { // IE<9
        self.attachEvent("onmousewheel", bindScroll);
    }
});


function bindScroll(e) {
    e.preventDefault();
    if ($(this.catalog).is(':animated')) {
        return false;
    }
    var whDelta = e.deltaY || e.detail || e.wheelDelta;
    if (whDelta > 0 && isLeft(this)) {
        right(this);
    } else if (whDelta < 0 && isRight(this)) {
        left(this);
    }
}

var right = function (th) {
    $(th.catalog).animate({ left: "+=" + th.delta }, 350, function () {
        checkSwitch(th);
    });
};
var left = function (th) {
    $(th.catalog).animate({ left: "-=" + th.delta }, 350, function () {
        checkSwitch(th);
    });
};
var checkSwitch = function (th) {
    if (isRight(th)) {
        $(th).find('.arrow-forward').show();
    } else {
        $(th).find('arrow-forward').hide();
    }
    if (isLeft(th)) {
        $(th).find('arrow-back').show();
    } else {
        $(th).find('arrow-back').hide();
    }
};
var isRight = function (th) {
    var leftHide = parseInt($(th.catalog).css('left'));
    var rightHide = th.tabsWidth + leftHide - th.tabMenu;
    if (rightHide > 0) {
        return true;
    } else {
        return false;
    }
};
var isLeft = function (th) {
    var leftHide = parseInt($(th.catalog).css('left'));
    if (leftHide === 0) {
        return false;
    } else if (leftHide < 0) {
        return true;
    }
};
/* End Catalog scroller */
/* --- */