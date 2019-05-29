import Field from './Field';

/**
 * Reference field.
 */
class ReferenceField extends Field {
    /**
     * Contructor.
     *
     * @param {string} id Field Id.
     * @param {Regex} validation Regex validation for the form.
     */
    constructor(id, validation) {
        super(id, validation);

        this.isFreeInput = false;


        this.otherOption = this.fieldParent.querySelector('.other-option').cloneNode();
        this.fieldParent.removeChild(this.fieldParent.querySelector('.other-option'));

        this.masterSwitchListener();
    }

    /**
     * Master switch Listener.
     */
    masterSwitchListener() {
        const masterSwitch = this.fieldParent.querySelector(`*[name="${this.id}"]`);

        masterSwitch.addEventListener('input', () => {
            let selector = `*[name="${this.id}"]`;

            if (masterSwitch.value === 'OTHER' && !this.isFreeInput) {
                this.fieldParent.appendChild(this.otherOption);
                selector = '.other-option';
                this.isFreeInput = true;
            } else if (this.isFreeInput) {
                this.otherOption.value = '';
                this.fieldParent.removeChild(this.fieldParent.querySelector('.other-option'));
                this.isFreeInput = false;
            }

            this.removeListenDataChange();
            this.reloadValueProvider(selector);
            this.addListenDataChange();
        });
    }
}

export default ReferenceField;
