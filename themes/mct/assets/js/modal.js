const modal = (function () {
    const baseUrl = window.location.href;

    let modules = null;
    let modal = null;
    let body = null;

    const setup = function () {
        modules = document.querySelectorAll('.js-module');
        modal = document.querySelector('.js-dialog');
        body = document.querySelector('body');

        enableListeners(modules);

        window.addEventListener('popstate', async function (e) {
            // Check if we came from a modal
            if (e.state && e.state.inModal) {
                // We need a modal with the current url pls...
                attachModel(null, window.location);
                // otherwise, we remove the modal
            } else {
                if (modal) {
                    closeModal();
                } else {
                    // When there is no modal, we reload the page to prevent a wrong url... Maybe we are just getting a url from the history without really 'using' that page.
                    window.location = window.location;
                }
            }
        });
    };

    const enableListeners = function (nodeList) {
        if (nodeList) {
            for (const m of nodeList) {
                m.addEventListener('click', attachModel);
            }
        }

        if (modal) {
            modal.addEventListener('close', function () {
                body.classList.remove('has-modal');
                history.replaceState({}, window.title, baseUrl);
            });
        }
    };

    const showModal = function () {
        modal.showModal();
        body.classList.add('has-modal');
    };

    const closeModal = function () {
        modal.close();
        history.replaceState({}, window.title, baseUrl);
    };

    const listenToGeneratedModal = function () {
        const closeBtn = modal.querySelector('.js-dialog-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                closeModal();
            });
        }

        const followModules = modal.querySelectorAll('.js-module-link');
        for (const m of followModules) {
            m.addEventListener('click', (event) => attachModel(event, m.href));
        }
    };

    const populateModal = function (data) {
        const modalHTML = `
				<div class="c-modal__body c-modal__body--module c-modal__body--module-${
                    data.pillar
                }">
				<button class="c-modal__close js-dialog-close" aria-label="Close dialog">
					<svg role="img" class="c-symbol c-symbol-close c-nav-main-trigger__symbol">
						<use xlink:href="/img/svg/svg-symbols.svg#c-symbol-close"></use>
					</svg>
				</button>

				<ul class="o-list c-curriculum-legend">
					<li class="c-curriculum-legend__item">
						<span class="c-curriculum-legend__swatch u-bgcolor-${data.pillar}-base"></span>
						${data.pillar}
					</li>
				</ul>
				<h1 class="c-type-intro u-mb-alpha">
					${data.title}
				</h1>

				<p class="c-type-meta u-ms-1 u-color-neutral-base">
					#${data.tags.join(' #')}
				</p>

				<div class="u-max-width-optimal">
					${
                        data.description
                            ? `
						<p class="c-type-intro-small ">
							${data.description}
						</p>
					`
                            : ``
                    }
					${
                        data.tools
                            ? `
						<h3 class="u-mb-alpha">
							Tools: <span class="u-color-neutral-base"></span>
						</h3>
						<p class="u-color-neutral-base">
							${data.tools}
						</p>
					`
                            : ``
                    }
					<div class="s-content ">
						${data.content}
					</div>

				</div>
			</div>`;

        modal.innerHTML = modalHTML;
        listenToGeneratedModal();
    };

    const getModuleData = function (url) {
        return fetch(`${url}index.json`)
            .then((r) => r.json())
            .then((d) => d);
    };

    const attachModel = async function (e, moduleUrl) {
        if (e) {
            e.preventDefault();
            moduleUrl = this.href;
        }

        const data = await getModuleData(moduleUrl);
        populateModal(data);

        // This happened by an event
        if (e) {
            history.pushState({ inModal: true }, data.title, moduleUrl);
            // This happened by history navigation
        } else {
            history.replaceState({ inModal: true }, data.title, moduleUrl);
        }

        if (!modal.open) {
            showModal();
        }
    };

    return {
        setup: setup,
    };
})();
