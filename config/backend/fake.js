const bodyParser = require('body-parser');

/**
 * Field Validator.
 *
 * @param {Any} value Data on field.
 * @param {Object} property Property Data.
 */
function fieldValidator(value, property) {
    const keys = Object.keys(property.validator);

    for (const key of keys) {
        const validation = property.validator[key];

        switch (key) {
        case 'length':
            if (value.length > validation) {
                return {
                    field: property.name,
                    type: 'VALIDATION',
                    error: {
                        type: 'GREATER',
                        expected: property.validator.length,
                    },
                };
            } if (value.length < 1) {
                return {
                    field: property.name,
                    type: 'VALIDATION',
                    error: {
                        type: 'SMALLER',
                        expected: 1,
                    },
                };
            }
            break;

        case 'match':
            if (value.match(validation) === null) {
                return {
                    field: property.name,
                    type: 'VALIDATION',
                    error: {
                        type: 'NOT_MATCH',
                    },
                };
            }
            break;

        case 'boolean':
            if (value !== validation) {
                return {
                    field: property.name,
                    type: 'VALIDATION',
                    error: {
                        type: 'NOT_MATCH',
                        expect: validation,
                    },
                };
            }
            break;

        default: break;
        }
    }

    return false;
}

/**
 * Object Matcher.
 *
 * @param {Object} obj Object to be matched.
 * @param {Array} properties Array of properties.
 */
function dataValidator(obj, properties) {
    return properties.reduce((errors, property) => {
        if (Object.prototype.hasOwnProperty.call(obj, property.name)) {
            const dataValue = obj[property.name];
            const error = fieldValidator(dataValue, property);

            if (error) {
                errors.push(error);
            }
        } else {
            errors.push({
                field: property.name,
                type: 'MISSING',
            });
        }

        return errors;
    }, []);
}

/**
 * Backend business.
 *
 * @param {Object} req Request Data.
 * @param {Object} res Response Data.
 */
function backendBusiness(req, res) {
    const REQUIRED_FIELDS = [
        {
            name: 'firstName',
            validator: {
                length: 30,
            },
        },
        {
            name: 'lastName',
            validator: {
                length: 30,
            },
        },
        {
            name: 'phone',
            validator: {
                length: 30,
                match: /\d+/gm,
            },
        },
        {
            name: 'email',
            validator: {
                length: 50,
                match: /\S+@\S+\.\S+/gm,
            },
        },
        {
            name: 'terms',
            validator: {
                boolean: true,
            },
        },
    ];


    const { body } = req;

    if (!body.promo || body.promo === '') {
        REQUIRED_FIELDS.push({
            name: 'ref',
            validator: {
                length: 255,
            },
        });
    } else {
        REQUIRED_FIELDS.push({
            name: 'promo',
            validator: {
                length: 7,
                match: /[a-z0-9]+/gm,
            },
        });
    }

    const validation = dataValidator(body, REQUIRED_FIELDS);

    if (validation.length === 0) {
        res.status(200).json({ ok: true });
    } else {
        res.status(400).json({ error: validation });
    }
}

/**
 * Fake Backend business.
 *
 * @param {Express} app Express App.
 */
function fakeBackend(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.post('/save-form/', backendBusiness);
}

module.exports = fakeBackend;
