// // TODO: functies schrijven + opkuisen
// // TODO: js classes

// var trackHolders = document.querySelectorAll('.js-dynamic-track'),
//     tracks = {
//         'next-web-developer': 9,
//         'smart-xr-developer': 10,
//         'infrastructure-engineer': 11,
//         'ai-engineer': 14,
//     };

// function _fadeModules() {
//     for (let i = 0; i < trackHolders.length; i++) {
//         trackHolders[i].classList.remove('is-selected');
//     }
// }

// function getModules(slug) {
//     document.querySelector('.js-call-to-action').style.display = 'none';

//     _fadeModules();
//     let modulesToSelect = document.querySelectorAll(`.js-${slug}-track`);
//     for (let i = 0; i < modulesToSelect.length; i++) {
//         modulesToSelect[i].classList.add('is-selected');
//     }
// }

// function selectAndDeselectOptions(optionToSelect, allOptions, l, s) {
//     for (var i = allOptions.length - 1; i >= 0; i--) {
//         if (allOptions[i].getAttribute('data-module') == optionToSelect) {
//             allOptions[i].classList.add('is-selected');
//             var active = allOptions[i].dataset.name;
//         } else {
//             allOptions[i].classList.remove('is-selected');
//         }
//     }
//     s.querySelector('span').innerText = active;
// }

// function addEscFunction(e) {
//     e = e || window.event;
//     var isEscape = false;
//     if ('key' in e) {
//         isEscape = e.key == 'Escape' || e.key == 'Esc';
//     } else {
//         isEscape = e.keyCode == 27;
//     }
//     if (isEscape) {
//         document
//             .querySelector('.js-curriculum-choices')
//             .classList.add('is-hidden');
//         document.removeEventListener('keydown', addEscFunction, true);
//     }
// }

// function getItemsAndAddListeners(s, l, o) {
//     if (s) {
//         s.addEventListener('click', function (e) {
//             l.classList.toggle('is-hidden');
//             document.addEventListener('keydown', addEscFunction, true);
//         });

//         for (var i = o.length - 1; i >= 0; i--) {
//             o[i].addEventListener('click', function (e) {
//                 e.preventDefault();
//                 // showLoadingMessage();
//                 var target = e.target || e.srcElement;
//                 if (history.pushState) {
//                     history.pushState(
//                         null,
//                         null,
//                         '#profile-' + target.parentNode.dataset.slug
//                     );
//                 } else {
//                     window.location.hash =
//                         '#profile-' + target.parentNode.dataset.slug;
//                 }
//                 getModules(target.parentNode.dataset.slug);
//                 selectAndDeselectOptions(
//                     target.parentNode.dataset.module,
//                     o,
//                     l,
//                     s
//                 );
//                 l.classList.toggle('is-hidden');
//             });
//         }
//     }
// }

// function checkScrolling(containerTop, page) {
//     var scrollTop =
//         window.pageYOffset ||
//         (document.documentElement || document.body.parentNode || document.body)
//             .scrollTop;

//     if (scrollTop >= containerTop) {
//         page.classList.add('has-scrolled');
//     } else if (scrollTop <= containerTop) {
//         page.classList.remove('has-scrolled');
//     }
// }

// document.addEventListener('DOMContentLoaded', function () {
//     if (document.querySelector('.c-curriculum-overview')) {
//         var c = document.querySelector('.js-curriculum-choice'),
//             cT = c.offsetParent.offsetTop + c.offsetTop,
//             s = c.querySelector('.js-curriculum-button'),
//             l = document.querySelector('.js-curriculum-choices'),
//             o = document.querySelectorAll('.js-module'),
//             p = document.querySelector('body');

//         p.classList.add('js-page');

//         if (window.location.hash.substring(0, 9) == '#profile-') {
//             window.scrollTo(window.scrollX, window.scrollY - 28);
//             getModules(
//                 window.location.hash.substring(9, window.location.hash.length)
//             );
//             selectAndDeselectOptions(
//                 tracks[
//                     window.location.hash.substring(
//                         9,
//                         window.location.hash.length
//                     )
//                 ],
//                 o,
//                 l,
//                 s
//             );
//         }

//         getItemsAndAddListeners(s, l, o);

//         window.addEventListener('hashchange', function () {
//             var moduleSlug = window.location.hash.substring(
//                 9,
//                 window.location.hash.length
//             );

//             if (window.location.hash.substring(0, 9) == '#profile-') {
//                 getModules(moduleSlug);
//                 selectAndDeselectOptions(tracks[moduleSlug], o, l, s);
//             }
//         });

//         // document.addEventListener('scroll', function() {
//         // 	checkScrolling(cT, p);
//         // });
//     }
// });

(function () {
    let modules, dynamicModules, dropdown, trackList;

    const _addEscFunction = (e) => {
        e = e || window.event;
        let isEscape = false;
        if ('key' in e) {
            isEscape = e.key == 'Escape' || e.key == 'Esc';
        } else {
            isEscape = e.keyCode == 27;
        }
        if (isEscape) {
            document
                .querySelector('.js-curriculum-choices')
                .classList.add('is-hidden');
            document.removeEventListener('keydown', _addEscFunction, true);
        }
    };

    const _toggleModules = (track) => {
        for (const m of Array.from(dynamicModules)) {
            if (m.classList.contains(`js-track-${track}`)) {
                m.classList.add('is-visible');
            } else {
                m.classList.remove('is-visible');
            }
        }
    };

    const enablePopupModules = () => {
        // Listen to click event and disable the default
        // Show the popup
        // Enable escape, etc.
    };

    const enableTrackDropDown = () => {
        dropdown.addEventListener('click', function () {
            trackList.classList.toggle('is-hidden');
            document.addEventListener('keydown', _addEscFunction, true);
        });

        trackList.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                console.dir(this);
                history.pushState(undefined, undefined, this.hash);
                _toggleModules(this.hash.substring(9, this.hash.length));
            });
        });
        // The dropdown changes the hash
        // When hash changes, modules are toggled
        // Check initial hash
    };

    document.addEventListener('DOMContentLoaded', () => {
        // GET SOME DOM
        if (document.querySelector('.c-curriculum-overview')) {
            dropdown = document.querySelector('.js-curriculum-button');
            modules = document.querySelectorAll('.js-module');
            dynamicModules = Array.from(modules).filter((module) =>
                module.classList.contains('js-module-dynamic')
            );
            trackList = document.querySelector('.js-curriculum-choices');
        }

        // BASIC FEATURES
        enablePopupModules();
        enableTrackDropDown();

        // DOM LISTENERS
        window.addEventListener('hashchange', function () {
            const moduleSlug = window.location.hash.substring(
                9,
                window.location.hash.length
            );
            console.log(
                'Prepped hash is',
                moduleSlug,
                ' from ',
                window.location
            );

            if (window.location.hash.substring(0, 9) == '#profile-') {
                // getModules(moduleSlug);
                // selectAndDeselectOptions(tracks[moduleSlug], o, l, s);
            }
        });
    });
})();
