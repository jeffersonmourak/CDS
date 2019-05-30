import Field from './Field';

/**
 * Check field.
 */
class CheckField extends Field {
    /**
     * Value extractor.
     */
    valueExtractor() {
        return this.valueProvider.checked;
    }

    /**
     * Validate Field.
     */
    validate() {
        this.isValid = this.value === true;
    }

    /**
     * Highlight field.
     */
    highlight() {
        this.labelEl.classList.add('border');
        this.labelEl.classList.add('border-danger');
    }

    /**
     * Clear highlight.
     */
    clearHighlight() {
        this.labelEl.classList.remove('border');
        this.labelEl.classList.remove('border-danger');
    }
}

export default CheckField;
