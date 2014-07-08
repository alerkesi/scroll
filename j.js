$(document).ready(function () {
    /* popup modules */
    $('.otzyv-textarea').click(function () {
        $('#otzyv-popup').show();
    });

    var itemName = $('.js-item-name').text();
    $('.js-showPicturePopup').click(function () {
        var $popup = $('#picture-popup');
        var $cZoom = $popup.find('.content-zoom');
        var $cLeft = $popup.find('.content-left');
        var $cTitle = $popup.find('.title-big');
        openPopup($popup);

        var $picsList = $('#pictures-content .vert-scroll-line').clone();
        var $mainPic = $('#pictures-content .js-mainPic').clone();
        $cTitle.text(itemName);
        $cLeft.append($picsList);
        $cZoom.append($mainPic);
        $popup.find('.popup-close').click(function () {
            $cLeft.empty();
            $cTitle.text('');
            $cZoom.empty();
        });
        setMouseenterOnLittlePic(document.getElementById('picture-popup'));
        checkZoomable();
        setDragArea();
        createScroll($picsList[0]);

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
        function resetZoomed() {
            $('.js-mainPic.isZoomable').removeClass('zoomed');
            $cZoom.unbind();
            $('.js-mainPic.isZoomable').css({
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%'
            })
        }

        function checkZoomable() {
            var mainPic = $mainPic[0];
            $mainPic.wK = mainPic.naturalWidth / $cZoom.width() || 1;
            $mainPic.hK = mainPic.naturalHeight / $cZoom.height() || 1;
            $mainPic.toggleClass('zoom-v', mainPic.naturalHeight > $cZoom.height());
            $mainPic.toggleClass('zoom-h', mainPic.naturalWidth > $cZoom.width());
            if (mainPic.naturalHeight > $cZoom.height() || mainPic.naturalWidth > $cZoom.width()) {
                $mainPic.addClass('isZoomable');
            } else $mainPic.removeClass('isZoomable')
        }

        function setDragArea() {
            $cZoom.dragArea = {
                height: $cZoom.height(),
                width: $cZoom.width(),
                posX: getOffsetRect($cZoom[0]).left,
                posY: getOffsetRect($cZoom[0]).top
            };
        }


    });
    $('.accessoires-link').click(function () {
        var $popup = $('#all-br-items');
        openPopup($popup);
    });
    /* end popup*/
    $('.starbar-big')
        .mousemove(function (e) {
        var x = e.pageX - getOffsetRect(e.target).left;
        $(this).children('div').width(x);
        })
        .mouseleave(function (e) {
            $(this).children('div').width(this.oldW);
        })
        .mouseenter(function (e) {
            this.oldW = $(this).children('div').width();
        })
        .click(function (e) {
            var x = e.pageX - getOffsetRect(e.target).left;
            this.oldW = $(this).children('div').width(x);
        });
    /* Calculate coords of relative element */
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

    /* -----*/
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
    var $footer = $('footer.footer');
    $footer.closeX = $footer.find('.close');
    $footer.footBody = $footer.find('.footer-body');
    $footer.tabs = $footer.find('.footer-tab');
    $footer.closeX.on('click', function () {
        $footer.footBody.slideUp(400);
        $footer.closeX.hide();
        $footer.tabs.removeClass('selected');
    });
    $footer.tabs.on('click', function () {
        $footer.footBody.slideDown(400);
        $footer.closeX.show();
        scrolls.each(function (i, s) {
            createScroll(s);
        })
    });
    $('.catalog__item__name').text(function () {
        return this.text.ellipsis(50);
    });
    (function bindToggleTab () {
        $('.tab-menu li').click(function () {
            if (!this.id) {
                return;
            }
            var clMenu = $(this).closest('.tab-menu'),
                clContent = clMenu.next('.tabs-content');
            clMenu.children('li').removeClass('selected');
            clContent.children('li').removeClass('selected');
            $(this).addClass('selected');
            var targetTabContent = clContent.children("[data-tab-id$='" + this.id + "']");
            targetTabContent.addClass('selected');

        })
    })();
    var scrolls = $('.scroll-line');
    scrolls.each(function (i, self) {
        createScroll(self);
    });
});
String.prototype.ellipsis = function (maxLength) {
    return this.length > maxLength ? this.substr(0, maxLength - 3) + '...' : this;
};
var openOtzyvTab = function () {
    $('#windowTab3').click();
    $('html, body').animate({
        scrollTop: $("#windowTab3").offset().top
    }, 1000);
};
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
/* Catalog scroller */

var createScroll = function (self) {
    self.horizontal = $(self).hasClass('horiz-scroll-line');
    self.vertical = !$(self).hasClass('horiz-scroll-line');
    self.tabs = $(self).find('.scroll-tabs');
    self.catalog = self.tabs.find('.scroll-catalog');
    self.items = self.catalog.find('.scroll-item');
    self.delta = self.horizontal ? self.items.outerWidth(true) : self.items.outerHeight(true);
    self.catalogSizePx = self.horizontal ? self.items.length * self.delta : self.items.length * self.delta;
    self.areaSizePx = self.horizontal ? self.tabs.width() : self.tabs.height();
    self.arrowForward = $(self).find('.arrow-forward');
    self.arrowBack = $(self).find('.arrow-back');
    self.kulisa = $(self).find('.catalog__kulisa');
    self.kulisa.css({
        width: (1 - (parseInt(self.areaSizePx / self.delta, 10) + 1 - self.areaSizePx / self.delta)) * self.delta,
        left: parseInt(self.areaSizePx / self.delta, 10) * self.delta
    });
    self.forwardPossible = function () {
        return self.catalogSizePx + parseInt(self.horizontal ? $(self.catalog).css('left') : ($(self.catalog).css('top')), 10) - self.areaSizePx > 0;
    };
    self.backPossible = function () {
        return parseInt(self.horizontal ? $(self.catalog).css('left') : ($(self.catalog).css('top')), 10) < 0;
    };
    self.checkSwitch = function () {
        if (self.forwardPossible()) {
            self.arrowForward.show();
        } else {
            self.arrowForward.hide();
        }
        if (self.backPossible()) {
            self.arrowBack.show();
        } else {
            self.arrowBack.hide();
        }
    };
    self.forward = function () {
        if (self.forwardPossible() && !$(self.catalog).is(':animated')) {
            if (self.horizontal) {
                $(self.catalog).animate({ left: "-=" + self.delta }, 200);
            } else {
                $(self.catalog).animate({ top: "-=" + self.delta }, 200);
            }
            setTimeout(self.checkSwitch, 500);
        }
    };
    self.back = function () {
        if (self.backPossible() && !$(self.catalog).is(':animated')){
            if (self.horizontal) {
                $(self.catalog).animate({ left: "+=" + self.delta }, 200);
            } else {
                $(self.catalog).animate({ top: "+=" + self.delta }, 200);
            }
            setTimeout(self.checkSwitch, 500);
        }
    };
    self.bindScroll = function (e) {
        e.preventDefault();
        var whDelta = e.deltaY || e.detail || e.wheelDelta;
        if (whDelta > 0) {
            self.forward();
        } else if (whDelta < 0) {
            self.back();
        }
    };
    self.checkSwitch();
    if (self.addEventListener) {
        if ('onwheel' in document) {
            self.addEventListener("wheel", self.bindScroll, false);
        } else if ('onmousewheel' in document) {
            self.addEventListener("mousewheel", self.bindScroll, false);
        } else {
            self.addEventListener("MozMousePixelScroll", self.bindScroll, false);
        }
    } else {
        self.attachEvent("onmousewheel", self.bindScroll);
    }
    self.arrowBack.click(self.back);
    self.arrowForward.click(self.forward);
    $(window).resize(function () {
        self.areaSizePx = self.horizontal ? self.tabs.width() : self.tabs.height();
        self.checkSwitch();
        self.kulisa.css({
            width: (1 - (parseInt(self.areaSizePx / self.delta, 10) + 1 - self.areaSizePx / self.delta)) * self.delta,
            left: parseInt(self.areaSizePx / self.delta, 10) * self.delta
        });
    });

};
var hoverTimer;
window.addEventListener('scroll', function () {
    clearTimeout(hoverTimer);
    if (!document.body.classList.contains('disable-hover')) {
        document.body.classList.add('disable-hover');
    }
    hoverTimer = setTimeout(function () {
        document.body.classList.remove('disable-hover');
    }, 500);
}, false);

/* End Catalog scroller */