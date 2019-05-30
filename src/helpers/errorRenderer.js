
/**
 * Create close button.
 */
const createCloseBtn = () => {
    const el = document.createElement('button');
    const label = document.createElement('span');

    el.type = 'button';
    el.className = 'close';
    el.dataset.dismiss = 'alert';
    el.setAttribute('aria-label', 'Close');

    label.setAttribute('aria-hidden', true);
    label.innerHTML = '&times;';

    el.appendChild(label);

    return el;
};

/**
 * Create li element.
 *
 * @param {string} text Inner Text string.
 */
const createAlert = (text) => {
    const el = document.createElement('div');
    el.className = 'alert alert-danger';
    el.setAttribute('role', 'alert');
    el.innerText = text;

    el.appendChild(createCloseBtn());

    return el;
};

/**
 * Error Renderer.
 *
 * @param {Array} errors Array of texts.
 * @param {HTMLElement} parent Parent Target.
 */
const errorRender = (errors, parent) => {
    const liElements = errors.map(createAlert);

    // Children cleaner.
    while (parent.firstChild) {
        parent.firstChild.remove();
    }

    liElements.forEach((el) => { parent.appendChild(el); });
};


export default errorRender;
