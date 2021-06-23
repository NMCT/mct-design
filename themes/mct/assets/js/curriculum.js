// TODO: functies schrijven + opkuisen
// TODO: js classes

var trackHolders = document.querySelectorAll('.js-dynamic-track'),
    tracks = {
        'next-web-developer': 9,
        'smart-xr-developer': 10,
        'infrastructure-engineer': 11,
        'ai-engineer': 14,
    },
    s4Holder,
    s5Holder;

function _fadeModules() {
    for (let i = 0; i < trackHolders.length; i++) {
        trackHolders[i].classList.remove('is-selected');
    }
}

function getModules(slug) {
    document.querySelector('.js-call-to-action').style.display = 'none';

    _fadeModules();
    let modulesToSelect = document.querySelectorAll(`.js-${slug}-track`);
    for (let i = 0; i < modulesToSelect.length; i++) {
        modulesToSelect[i].classList.add('is-selected');
    }
    makeModulesFullHeight();
}

function selectAndDeselectOptions(optionToSelect, allOptions, l, s) {
    for (var i = allOptions.length - 1; i >= 0; i--) {
        if (allOptions[i].getAttribute('data-module') == optionToSelect) {
            allOptions[i].classList.add('is-selected');
            var active = allOptions[i].dataset.name;
        } else {
            allOptions[i].classList.remove('is-selected');
        }
    }
    s.querySelector('span').innerText = active;
}

function addEscFunction(e) {
    e = e || window.event;
    var isEscape = false;
    if ('key' in e) {
        isEscape = e.key == 'Escape' || e.key == 'Esc';
    } else {
        isEscape = e.keyCode == 27;
    }
    if (isEscape) {
        document
            .querySelector('.js-curriculum-choices')
            .classList.add('is-hidden');
        document.removeEventListener('keydown', addEscFunction, true);
    }
}

function getItemsAndAddListeners(s, l, o) {
    if (s) {
        s.addEventListener('click', function (e) {
            l.classList.toggle('is-hidden');
            document.addEventListener('keydown', addEscFunction, true);
        });

        for (var i = o.length - 1; i >= 0; i--) {
            o[i].addEventListener('click', function (e) {
                e.preventDefault();
                // showLoadingMessage();
                var target = e.target || e.srcElement;
                if (history.pushState) {
                    history.pushState(
                        null,
                        null,
                        '#profile-' + target.parentNode.dataset.slug
                    );
                } else {
                    window.location.hash =
                        '#profile-' + target.parentNode.dataset.slug;
                }
                getModules(target.parentNode.dataset.slug);
                selectAndDeselectOptions(
                    target.parentNode.dataset.module,
                    o,
                    l,
                    s
                );
                l.classList.toggle('is-hidden');
            });
        }
    }
}

function makeModulesFullHeight() {
    var m = document.querySelectorAll('.c-module'),
        h = 0;
    // Skip the largest (last) column
    for (var i = m.length - 1; i >= 0; i--) {
        m[i].style.minHeight = '';
        if (m[i].offsetHeight > h) {
            h = m[i].offsetHeight;
        }
    }
    for (var i = m.length - 1; i >= 0; i--) {
        m[i].style.minHeight = h + 'px';
    }
}

function checkScrolling(containerTop, page) {
    var scrollTop =
        window.pageYOffset ||
        (document.documentElement || document.body.parentNode || document.body)
            .scrollTop;

    if (scrollTop >= containerTop) {
        page.classList.add('has-scrolled');
    } else if (scrollTop <= containerTop) {
        page.classList.remove('has-scrolled');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.c-curriculum-overview')) {
        var c = document.querySelector('.js-curriculum-choice'),
            cT = c.offsetParent.offsetTop + c.offsetTop,
            s = c.querySelector('.js-curriculum-button'),
            l = document.querySelector('.js-curriculum-choices'),
            o = document.querySelectorAll('.js-curriculum-item'),
            p = document.querySelector('body');

        (s4Holder = document.querySelector('.js-semester-4')),
            (s5Holder = document.querySelector('.js-semester-5'));

        p.classList.add('js-page');

        if (window.location.hash.substring(0, 9) == '#profile-') {
            window.scrollTo(window.scrollX, window.scrollY - 28);
            getModules(
                window.location.hash.substring(9, window.location.hash.length)
            );
            selectAndDeselectOptions(
                tracks[
                    window.location.hash.substring(
                        9,
                        window.location.hash.length
                    )
                ],
                o,
                l,
                s
            );
        }

        getItemsAndAddListeners(s, l, o);

        window.addEventListener('hashchange', function () {
            var moduleSlug = window.location.hash.substring(
                9,
                window.location.hash.length
            );

            if (window.location.hash.substring(0, 9) == '#profile-') {
                getModules(moduleSlug);
                selectAndDeselectOptions(tracks[moduleSlug], o, l, s);
            }
        });

        // document.addEventListener('scroll', function() {
        // 	checkScrolling(cT, p);
        // });
    }

    // If there is a module, make them all the same height.
    if (document.querySelector('.c-module')) {
        window.addEventListener('resize', function () {
            makeModulesFullHeight();
        });

        makeModulesFullHeight();
    }
});
