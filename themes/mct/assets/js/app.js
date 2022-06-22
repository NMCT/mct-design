/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
(function () {
    if ('undefined' !== typeof window && window.addEventListener) {
        var e = Object.create(null),
            l,
            d = function () {
                clearTimeout(l);
                l = setTimeout(n, 100);
            },
            m = function () {},
            t = function () {
                window.addEventListener('resize', d, !1);
                window.addEventListener('orientationchange', d, !1);
                if (window.MutationObserver) {
                    var k = new MutationObserver(d);
                    k.observe(document.documentElement, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0,
                    });
                    m = function () {
                        try {
                            k.disconnect(),
                                window.removeEventListener('resize', d, !1),
                                window.removeEventListener(
                                    'orientationchange',
                                    d,
                                    !1
                                );
                        } catch (v) {}
                    };
                } else
                    document.documentElement.addEventListener(
                        'DOMSubtreeModified',
                        d,
                        !1
                    ),
                        (m = function () {
                            document.documentElement.removeEventListener(
                                'DOMSubtreeModified',
                                d,
                                !1
                            );
                            window.removeEventListener('resize', d, !1);
                            window.removeEventListener(
                                'orientationchange',
                                d,
                                !1
                            );
                        });
            },
            u = function (k) {
                function e(a) {
                    if (void 0 !== a.protocol) var c = a;
                    else (c = document.createElement('a')), (c.href = a);
                    return c.protocol.replace(/:/g, '') + c.host;
                }
                if (window.XMLHttpRequest) {
                    var d = new XMLHttpRequest();
                    var m = e(location);
                    k = e(k);
                    d =
                        void 0 === d.withCredentials && '' !== k && k !== m
                            ? XDomainRequest || void 0
                            : XMLHttpRequest;
                }
                return d;
            };
        var n = function () {
            function d() {
                --q;
                0 === q && (m(), t());
            }
            function l(a) {
                return function () {
                    !0 !== e[a.base] &&
                        (a.useEl.setAttributeNS(
                            'http://www.w3.org/1999/xlink',
                            'xlink:href',
                            '#' + a.hash
                        ),
                        a.useEl.hasAttribute('href') &&
                            a.useEl.setAttribute('href', '#' + a.hash));
                };
            }
            function p(a) {
                return function () {
                    var c = document.body,
                        b = document.createElement('x');
                    a.onload = null;
                    b.innerHTML = a.responseText;
                    if ((b = b.getElementsByTagName('svg')[0]))
                        b.setAttribute('aria-hidden', 'true'),
                            (b.style.position = 'absolute'),
                            (b.style.width = 0),
                            (b.style.height = 0),
                            (b.style.overflow = 'hidden'),
                            c.insertBefore(b, c.firstChild);
                    d();
                };
            }
            function n(a) {
                return function () {
                    a.onerror = null;
                    a.ontimeout = null;
                    d();
                };
            }
            var a,
                c,
                q = 0;
            m();
            var f = document.getElementsByTagName('use');
            for (c = 0; c < f.length; c += 1) {
                try {
                    var g = f[c].getBoundingClientRect();
                } catch (w) {
                    g = !1;
                }
                var h =
                    (a =
                        f[c].getAttribute('href') ||
                        f[c].getAttributeNS(
                            'http://www.w3.org/1999/xlink',
                            'href'
                        ) ||
                        f[c].getAttribute('xlink:href')) && a.split
                        ? a.split('#')
                        : ['', ''];
                var b = h[0];
                h = h[1];
                var r =
                    g &&
                    0 === g.left &&
                    0 === g.right &&
                    0 === g.top &&
                    0 === g.bottom;
                g && 0 === g.width && 0 === g.height && !r
                    ? (f[c].hasAttribute('href') &&
                          f[c].setAttributeNS(
                              'http://www.w3.org/1999/xlink',
                              'xlink:href',
                              a
                          ),
                      b.length &&
                          ((a = e[b]),
                          !0 !== a &&
                              setTimeout(
                                  l({ useEl: f[c], base: b, hash: h }),
                                  0
                              ),
                          void 0 === a &&
                              ((h = u(b)),
                              void 0 !== h &&
                                  ((a = new h()),
                                  (e[b] = a),
                                  (a.onload = p(a)),
                                  (a.onerror = n(a)),
                                  (a.ontimeout = n(a)),
                                  a.open('GET', b),
                                  a.send(),
                                  (q += 1)))))
                    : r
                    ? b.length &&
                      e[b] &&
                      setTimeout(l({ useEl: f[c], base: b, hash: h }), 0)
                    : void 0 === e[b]
                    ? (e[b] = !0)
                    : e[b].onload &&
                      (e[b].abort(), delete e[b].onload, (e[b] = !0));
            }
            f = '';
            q += 1;
            d();
        };
        var p = function () {
            window.removeEventListener('load', p, !1);
            l = setTimeout(n, 0);
        };
        'complete' !== document.readyState
            ? window.addEventListener('load', p, !1)
            : p();
    }
})();

function initNavigation() {
    var navigation = '.js-nav-mobile',
        trigger = '.js-nav-trigger',
        navigationElement = document.querySelector(navigation),
        triggerElements = document.querySelectorAll(trigger);

    const top = document.querySelector('.c-row--top');
    if (top) {
        navigationElement.style.top = `${top.clientHeight + 1}px`;
    }

    for (var i = triggerElements.length - 1; i >= 0; i--) {
        triggerElements[i].addEventListener('click', function () {
            navigationElement.classList.toggle('is-visible');
            if (document.documentElement.classList.contains('is-fixed')) {
                document.documentElement.classList.remove('is-fixed');
            } else {
                document.documentElement.classList.add('is-fixed');
            }
        });
    }
}

function getReadyToRemoveCookie() {
    let cookieBox = document.querySelector('.js-cookie-message'),
        cookieBtn = document.querySelector('.js-cookie-button');

    if (!localStorage.getItem('ok-with-cookies')) {
        cookieBox.style.display = 'flex';
        cookieBtn.addEventListener('click', () => {
            cookieBox.style.display = 'none';
            localStorage.setItem('ok-with-cookies', true);
        });
    }
}

function pauseAllVideos() {
    const videos = document.querySelectorAll('video');
    for (const v of videos) {
        v.pause();
    }
}

function initVideoPlayer() {
    let videoplayers = document.querySelectorAll('.c-video-player');
    if (videoplayers.length > 0) {
        for (const videoplayer of videoplayers) {
            var v = videoplayer.querySelector('.c-video-player__video'),
                playBtns = videoplayer.querySelectorAll('.c-video-play-button');

            for (const btnPlay of playBtns) {
                btnPlay.addEventListener('click', function () {
                    if (
                        videoplayer.classList.contains('c-video-player--circle')
                    ) {
                        const video = btnPlay.parentNode.querySelector('video');
                        // Do some shit
                        if (btnPlay.classList.contains('is-playing')) {
                            video.pause();
                            btnPlay.classList.remove('is-playing');
                            btnPlay.setAttribute('aria-label', 'Speel video');
                        } else {
                            pauseAllVideos();
                            video.play();
                            btnPlay.classList.add('is-playing');
                            btnPlay.setAttribute('aria-label', 'Pauzeer video');
                        }

                        video.addEventListener(
                            'ended',
                            function () {
                                btnPlay.classList.remove('is-playing');
                            },
                            false
                        );
                        video.addEventListener(
                            'pause',
                            function () {
                                btnPlay.classList.remove('is-playing');
                            },
                            false
                        );
                    } else {
                        // Normal video somewhere on the page
                        pauseAllVideos();
                        btnPlay.parentNode.querySelector('video').play();
                        btnPlay.parentNode
                            .querySelector('video')
                            .setAttribute('controls', 'controls');
                        btnPlay.classList.add('is-hidden');
                    }
                });
            }
        }
    }
}

var checkNotification = function () {
    const announcement = document.querySelector('.js-announcement');
    if (announcement) {
        var givenDate = announcement.getAttribute('data-due-date');
        var currentDate = new Date();
        givenDate = new Date(givenDate);

        if (givenDate > currentDate) {
            announcement.style.display = 'flex';
        }
    }
};

window.addEventListener('resize', function () {
    if (window.innerWidth > 960) {
        document.documentElement.classList.remove('is-fixed');
        document.querySelector('.js-nav-mobile').classList.remove('is-visible');
    }

    const top = document.querySelector('.c-row--top');

    if (top) {
        document.querySelector('.js-nav-mobile').style.top = `${
            top.clientHeight + 1
        }px`;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    initVideoPlayer();
    getReadyToRemoveCookie();
    checkNotification();

    modal.setup();

    const observer = lozad(); // lazy loads elements with default selector as ".lozad"
    observer.observe();

    if (typeof mct_carousel != 'undefined') {
        mct_carousel.initCarousel();
    }

    if (document.querySelector('.js-sharing')) {
        mct_sharing.init();
    }
});

window.addEventListener('load', function () {
    initNavigation();
});
