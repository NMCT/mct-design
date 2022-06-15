(function () {
    function _getItemsAndAddListeners(modules) {
        modules.forEach((module) => {
            module.addEventListener('click', function (e) {
                module.addEventListener('click', function (e) {
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
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        const body = document.querySelector('body');
        body.classList.add('js-page');

        const modules = Array.from(
            document.querySelectorAll('.c-module--link')
        );

        if (modules) {
            _getItemsAndAddListeners(modules);
        }
    });

    console.log('.c-module--link');
})();
