/**
 * Validation error generator.
 *
 * @param {Object} error Error Data.
 * @param {string} field Field Name.
 */
const validationErrGenerator = (error, field) => {
    switch (error.type) {
    case 'SMALLER':
        return `The field ${field.label} is too small, expected at least ${error.expected} ${error.expected > 1 ? 'characters' : 'character'}.`;
    case 'GREATER':
        return `The field ${field.label} is too big. Expected at most ${error.expected} ${error.expected > 1 ? 'characters' : 'character'}.`;
    case 'NOT_MATCH':
        return `The field ${field.label} is not matching. Expected to be ${error.expected}.`;
    default:
    }

    return '';
};

/**
 * Error text generator.
 *
 * @param {Object} error Array of backend errors.
 */
const errorText = (error) => {
    switch (error.type) {
    case 'VALIDATION':
        return validationErrGenerator(error.error, error.field);

    default:
    }
    return '';
};

/**
 * Error text generator.
 *
 * @param {Array} errors Array of backend errors.
 */
const errorTextGen = errors => errors.reduce((acc, error) => [...acc, { text: errorText(error), type: 'danger' }], []);

export default errorTextGen;
