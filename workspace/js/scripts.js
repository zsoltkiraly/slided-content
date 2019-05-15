/*
Slided content - Code by Zsolt Király
v1.1.8 - 2018-06-22
*/

'use strict';
var slidedContent = function() {

    function signatura() {
        if (window['console']) {
            const text = {
                black: '%c     ',
                blue: '%c   ',
                author: '%c  Zsolt Király  ',
                github: '%c  https://zsoltkiraly.com/'
            }

            const style = {
                black: 'background: #282c34',
                blue: 'background: #61dafb',
                author: 'background: black; color: white',
                github: ''
            }

            console.log(text.black + text.blue + text.author + text.github, style.black, style.blue, style.author, style.github);
        }
    }

    signatura();

    function getWidth() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }

    function sliderWidth(cB, iL, cL, cE) {
        var lenSlider = cE.length;
        var sliderLiWidth = cB.offsetWidth;

        var i = 0;

        for (; i < lenSlider; i++) {
            cE[i].style.width = sliderLiWidth + 'px';
            cE[i].setAttribute('data-id', i + 1);

            var getHeight = cE[i].offsetHeight;
        }

        var sliderFullWidth = sliderLiWidth * lenSlider;

        iL.style.width = sliderFullWidth + 'px';
    }

    function marginLeftSet(sC, cL, cE) {
        var active = cL.querySelector('li.content-element.active');
        var sliderLiDataId = parseFloat(active.getAttribute('data-id'));
        var sliderLiWidth = parseFloat(active.style.width, 10);
        cL.style.marginLeft = '-' + (sliderLiWidth * (sliderLiDataId - 1)) + 'px';
    }

    function disabled(disParam) {
        disParam.classList.add('disabled-click');

        setTimeout(function() {
            disParam.classList.remove('disabled-click');
        }, 600);
    }

    function navigation(sC, cB, iL, cL, cE) {
        var navigationPrev = sC.querySelector('.navigation-prev'),
            navigationNext = sC.querySelector('.navigation-next');

        function nextSlide(sC, iL, cL, cE, dI) {
            var sliderLiWidth = parseFloat(cE[0].style.width, 10),
                sliderUlGet = (parseFloat(cL.style.marginLeft, 10) * -1),
                sliderInnerLine = parseFloat(iL.style.width, 10);


            if (dI === undefined) {
                dI = 0;
            }

            if (sliderUlGet <= (sliderInnerLine - sliderLiWidth * 2 - dI)) {
                disabled(sC);

                cL.style.transition = 'all ' + 500 + 'ms';

                if (dI) {
                    cL.style.marginLeft = '-' + (sliderUlGet + sliderLiWidth + dI) + 'px';
                } else {
                    cL.style.marginLeft = '-' + (sliderUlGet + sliderLiWidth) + 'px';
                }

                setTimeout(function() {
                    cL.style.transition = '';
                }, 600);

                navigationPrev.classList.remove('in-active');

                function setActive(list) {
                    list.classList.remove('active');
                    list.nextElementSibling.classList.add('active');
                }

                var cEActive = sC.querySelector('.dots-navigation ul.dots-list .dots-element.active');
                setActive(cEActive);

                var dotsList = sC.querySelector('li.content-element.active');
                setActive(dotsList);
            }

            if (sliderUlGet == (sliderLiWidth * cE.length - (sliderLiWidth * 2))) {
                navigationNext.classList.add('in-active');
            }
        }

        function prevSlide(sC, iL, cL, cE, dI) {

            var sliderLiWidth = parseFloat(cE[0].style.width, 10),
                sliderUlGet = (parseFloat(cL.style.marginLeft, 10) * -1),
                sliderInnerLine = parseFloat(iL.style.width, 10);

            if (dI === undefined) {
                dI = 0;
            }

            if (sliderUlGet > 0) {

                disabled(sC);

                cL.style.transition = 'all ' + 500 + 'ms';

                if (dI) {
                    cL.style.marginLeft = '-' + (sliderUlGet - sliderLiWidth + dI) + 'px';

                } else {
                    cL.style.marginLeft = '-' + (sliderUlGet - sliderLiWidth) + 'px';
                }

                setTimeout(function() {
                    cL.style.transition = '';
                }, 600);

                navigationNext.classList.remove('in-active');

                function setActive(list) {
                    list.classList.remove('active');
                    list.previousElementSibling.classList.add('active');
                }

                var cEActive = sC.querySelector('.dots-navigation ul.dots-list .dots-element.active');
                setActive(cEActive);

                var dotsList = sC.querySelector('li.content-element.active');
                setActive(dotsList);

            }

            if (sliderUlGet == sliderLiWidth) {
                navigationPrev.classList.add('in-active');
            }
        }

        navigationNext.addEventListener('click', function(e) {
            nextSlide(sC, iL, cL, cE);
            e.preventDefault();
        }, false);

        navigationPrev.addEventListener('click', function(e) {
            prevSlide(sC, iL, cL, cE);
            e.preventDefault();
        }, false);

        var startx = 0,
            starty = 0,
            distx = 0,
            disty = 0,
            gap = 15,
            yMax = 15,
            sliderUlGet = 0,
            sliderLiWidth = 0;

        cB.addEventListener('touchstart', function(e) {

            var touchobj = e.changedTouches[0];
            startx = parseInt(touchobj.clientX);
            starty = parseInt(touchobj.clientY);

            sliderUlGet = (parseFloat(cL.style.marginLeft, 10) * -1);
            sliderLiWidth = parseFloat(cE[0].style.width, 10);

        }, false);

        cB.addEventListener('touchmove', function(e) {
            var touchobj = e.changedTouches[0],
                distx = parseInt(touchobj.clientX) - startx,
                disty = parseInt(touchobj.clientY) - starty;

            function gapSlide(d) {
                if (sliderUlGet == (sliderLiWidth * cE.length - (sliderLiWidth))) {
                    if (d > gap*1.5) {
                        cL.style.marginLeft = '-' + (sliderUlGet - d) + 'px';
                    }
                } else {
                    cL.style.marginLeft = '-' + (sliderUlGet - d) + 'px';
                }
            }

            if(distx > gap*1.5 && Math.abs(disty) < yMax) {
                distx = parseInt(touchobj.clientX) - gap - startx;

                gapSlide(distx);

            } else if(distx < -gap*1.5 && Math.abs(disty) < yMax) {
                distx = parseInt(touchobj.clientX) + gap - startx;

                gapSlide(distx);
            }
        }, false);

        cB.addEventListener('touchend', function(e) {
            var touchobj = e.changedTouches[0],
                distx = parseInt(touchobj.clientX) - startx,
                disty = parseInt(touchobj.clientY) - starty;

            if (distx > gap*1.5 && Math.abs(disty) < yMax) {
                if(sliderUlGet !== 0) {
                    distx = distx - gap;
                    prevSlide(sC, iL, cL, cE, distx);

                    if (sliderUlGet == sliderLiWidth) {
                        navigationPrev.classList.add('in-active');
                    }
                }
            } else if (distx < -gap*1.5 && Math.abs(disty) < yMax) {
                if (sliderUlGet !== (sliderLiWidth * cE.length - (sliderLiWidth))) {

                    distx = distx + gap;
                    nextSlide(sC, iL, cL, cE, distx);

                    if (sliderUlGet == (sliderLiWidth * cE.length - (sliderLiWidth * 2))) {
                        navigationNext.classList.add('in-active');
                    }
                }

            } else {

                var sliderLiActive = cL.querySelector('li.content-element.active'),
                    sliderActiveDataId = parseFloat(sliderLiActive.getAttribute('data-id'), 10),
                    sliderActiveDistance = (sliderActiveDataId * parseFloat(sliderLiActive.style.width, 10) - parseFloat(sliderLiActive.style.width, 10));

                cL.style.transition = 'all ' + 500 + 'ms';

                setTimeout(function() {
                    cL.style.transition = '';
                }, 600);

                cL.style.marginLeft = '-' + sliderActiveDistance + 'px';
            }
        }, false);

        var dotsElement = sC.querySelectorAll('.dots-navigation ul.dots-list li.dots-element');

        var i = 0,
            lenDots = dotsElement.length;
        for (; i < lenDots; i++) {

            var dotsElements = dotsElement[i];

            dotsElements.setAttribute('data-id', i + 1);
            dotsElements.addEventListener('click', function() {

                disabled(sC);

                var i = 0,
                    lenDots = dotsElement.length;
                for (; i < lenDots, i < cE.length; i++) {
                    var dotsElements = dotsElement[i],
                        cEs = cE[i];

                    var obj = this;

                    if (obj == dotsElements) {
                        dotsElements.classList.add('active');

                    } else {
                        dotsElements.classList.remove('active');
                    }

                    if (parseFloat(obj.getAttribute('data-id')) == 1) {
                        navigationPrev.classList.add('in-active');
                        navigationNext.classList.remove('in-active');

                    } else if (parseFloat(obj.getAttribute('data-id')) == cE.length) {
                        navigationNext.classList.add('in-active');
                        navigationPrev.classList.remove('in-active');

                    } else if (parseFloat(obj.getAttribute('data-id')) != cE.length && parseFloat(obj.getAttribute('data-id')) != 1) {
                        navigationNext.classList.remove('in-active');
                        navigationPrev.classList.remove('in-active');
                    }

                    if (parseFloat(obj.getAttribute('data-id')) == parseFloat(cEs.getAttribute('data-id'))) {
                        cEs.classList.add('active');

                        var sliderLiWidth = parseFloat(cE[0].style.width, 10),
                            sliderUlGet = (parseFloat(cL.style.marginLeft, 10) * -1),
                            sliderInnerLine = parseFloat(iL.style.width, 10);

                        cL.style.transition = 'all ' + 500 + 'ms';
                        cL.style.marginLeft = '-' + ((sliderLiWidth * parseFloat(obj.getAttribute('data-id'))) - sliderLiWidth) + 'px';

                        setTimeout(function() {
                            cL.style.transition = '';
                        }, 600);

                    } else {
                        cEs.classList.remove('active');
                    }
                }
            }, false);
        }
    }

    function dotsDOM(sC, cE) {
        var dotsContainer = document.createElement('DIV');
        dotsContainer.setAttribute('class', 'dots-navigation');
        sC.insertBefore(dotsContainer, sC.lastChild);

        var dotsNavigation = sC.querySelector('.dots-navigation');

        dotsNavigation.innerHTML = '<ul class="dots-list"></ul>';

        var dots = dotsNavigation.querySelector('ul.dots-list');

        var stop = 0;
        while (stop < cE.length) {
            dots.innerHTML += '<li class="dots-element"></li>';
            stop++;
        }

        var dotsFirstElement = dots.querySelectorAll('li.dots-element')[0];

        dotsFirstElement.classList.add('active');
    }

    function loading(container) {
        setTimeout(function() {
            container.classList.remove('show');

            setTimeout(function() {
                container.classList.remove('loading');
            }, 1000);

        }, 1000);
    }

    function app(config) {
        var slidedContent = document.querySelector('#'+ config.render +'.slided-content');

        if (slidedContent) {
            var contentBox = slidedContent.querySelector('.content-box'),
                innerLine = contentBox.querySelector('.inner-line'),
                contentList = contentBox.querySelector('ul.content-list'),
                contentElement = contentList.querySelectorAll('li.content-element');

            contentList.style.marginLeft = '0px';

            sliderWidth(contentBox, innerLine, contentList, contentElement);

            var cachedWidth = getWidth();

            window.addEventListener('resize', function() {
                var newWidth = getWidth();

                if(newWidth !== cachedWidth) {
                    sliderWidth(contentBox, innerLine, contentList, contentElement);
                    marginLeftSet(slidedContent, contentList, contentElement);
                }
            }, false);

            dotsDOM(slidedContent, contentElement);
            navigation(slidedContent, contentBox, innerLine, contentList, contentElement);

            loading(slidedContent)
        }
    }

    return {
        app: app
    }
}();