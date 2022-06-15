(function () {
    let curriculum, modules, dynamicModules, dropdown, trackList;

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

    const enableTrackDropDown = () => {
        dropdown.addEventListener('click', function () {
            trackList.classList.toggle('is-hidden');
            document.addEventListener('keydown', _addEscFunction, true);
        });

        trackList.querySelectorAll('.js-track-radio').forEach((radio) => {
            radio.addEventListener('change', function () {
                curriculum.dataset.placeholder = '';

                history.pushState(undefined, undefined, `#${this.id}`);

                _toggleModules(this.id.substring(8, this.id.length));

                dropdown.querySelector('span').innerHTML =
                    this.nextElementSibling.innerText;
            });

            radio.addEventListener('click', function () {
                trackList.classList.add('is-hidden');
            });
        });
    };

    const checkForQueryString = () => {
        if (window.location.hash.substring(0, 9) === '#profile-') {
            const track = window.location.hash.substring(
                9,
                window.location.hash.length
            );

            const selectedRadio = document.querySelector(window.location.hash);
            selectedRadio.checked = true;

            dropdown.querySelector('span').innerHTML =
                selectedRadio.nextElementSibling.innerText;

            curriculum.dataset.placeholder = '';
            _toggleModules(track);
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        // GET SOME DOM
        if (document.querySelector('.c-curriculum-overview')) {
            curriculum = document.querySelector('.js-curriculum');
            dropdown = document.querySelector('.js-curriculum-button');

            trackList = document.querySelector('.js-curriculum-choices');

            modules = document.querySelectorAll('.js-module');

            if (modules) {
                dynamicModules = Array.from(modules).filter((module) =>
                    module.classList.contains('js-module-dynamic')
                );
            }

            // BASIC FEATURES
            enableTrackDropDown();
            checkForQueryString();
        }
    });
})();
