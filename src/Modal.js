/**
 * Modal handler class.
 */
class Modal {
    /**
     * Constructor.
     *
     * @param {string} id Modal Id.
     */
    constructor(id) {
        this.id = id;
        this.modalEl = document.querySelector(`#${this.id}`);
        this.modalActions = document.querySelectorAll(`[data-modal="${this.id}"]`);

        this.setupActions();
    }

    /**
     * Setup Actions.
     */
    setupActions() {
        this.modalActions.forEach((element) => {
            element.addEventListener('click', this.triggerAction.bind(this, element));
        });
    }

    /**
     * Trigger action.
     *
     * @param {HTMLElement} element Target element.
     * @param {Event} event Click event.
     */
    triggerAction(element, event) {
        event.preventDefault();
        event.stopPropagation();

        switch (element.dataset.action) {
        case 'open':
            this.open(); break;
        case 'close':
            this.close(); break;

        default:
        }
    }

    /**
     * Open modal.
     */
    open() {
        this.modalEl.classList.remove('hide');
    }

    /**
     * Close modal.
     */
    close() {
        this.modalEl.classList.add('hide');
    }
}

export default Modal;
