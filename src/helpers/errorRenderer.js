
/**
 * Create li element.
 *
 * @param {string} text Inner Text string.
 */
const createAlert = (text) => {
    const el = document.createElement('li');
    el.innerText = text;

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
