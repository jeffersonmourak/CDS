/**
 * Field Class.
 */
class Field {
    /**
     * Contructor.
     *
     * @param {string} id Field Id.
     * @param {Regex} validation Regex validation for the form.
     * @param {string} [valueProvider] Query of value provider.
     */
    constructor(id, validation, valueProvider) {
        this.id = id;
        this.validation = validation;
        this.fieldParent = document.querySelector(`#${this.id}`);
        this.labelEl = this.fieldParent.querySelector('span');
        this.label = this.labelEl.innerText;
        this.value = '';
        this.isDirty = false;
        this.isEmpty = true;
        this.isValid = false;

        /**
         * Commit data change.
         *
         * @private
         */
        this.commitDataChange = () => {
            this.value = this.valueExtractor();
            this.isEmpty = this.value === '';
            this.validate();
            this.onChange();
        };

        this.reloadValueProvider(valueProvider || `*[name="${this.id}"]`);
        this.addListenDataChange();
    }

    /**
     * Validate Field.
     */
    validate() {
        this.isValid = this.value.match(this.validation) !== null;
        this.isDirty = true;

        if (this.isValid) {
            this.clearHighlight();
        } else {
            this.highlight();
        }
    }

    /**
     * Highlight field.
     */
    highlight() {
        this.valueProvider.classList.add('border-danger');
    }

    /**
     * Clear highlight.
     */
    clearHighlight() {
        this.valueProvider.classList.remove('border-danger');
    }

    /**
     * Reload Value Provider.
     *
     * @param {string} query Query String.
     */
    reloadValueProvider(query) {
        this.valueProvider = this.fieldParent.querySelector(query);
    }

    /**
     * Add listen data change.
     *
     * @private
     */
    addListenDataChange() {
        this.valueProvider.addEventListener('input', this.commitDataChange);

        if (this.isDirty) {
            this.commitDataChange();
        }
    }

    /**
     * Remove listen data change.
     *
     * @private
     */
    removeListenDataChange() {
        this.valueProvider.removeEventListener('input', this.commitDataChange);
    }

    /**
     * Value extractor.
     */
    valueExtractor() {
        return this.valueProvider.value;
    }

    /**
     * On data change.
     */
    onChange() {

    }
}

export default Field;
