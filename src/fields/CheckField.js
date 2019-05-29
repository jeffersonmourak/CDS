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
}

export default CheckField;
