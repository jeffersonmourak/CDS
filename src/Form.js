import errorTextGen from './helpers/errorTextGen';
import errorRenderer from './helpers/errorRenderer';

/**
 * Form handler class.
 */
class Form {
    /**
     * Contructor.
     *
     * @param {string} id Form DOM Id.
     */
    constructor(id) {
        this.id = id;
        this.formEl = document.querySelector(`#${this.id}`);
        this.errorPanel = this.formEl.querySelector('#error');
        this.fields = [];

        this.formEl.addEventListener('submit', this.onSubmit.bind(this));
    }

    /**
     * On form submits.
     *
     * @param {Event} event Submit event.
     */
    async onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        try {
            const response = await fetch('/save-form', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(this.bodyBuilder()),
            });
            const body = await response.json();

            switch (response.status) {
            case 200:
                this.onOk(body);
                break;

            case 400:
                this.onError(body);
                break;

            default:
                break;
            }
        } catch (e) {
            console.error(e);
        }

        return false;
    }

    /**
     * On ok Response.
     *
     * @param {Object} body Response Body.
     */
    onOk(body) {
        if (body.ok) {
            const successText = document.querySelector('#success');
            successText.classList.remove('d-none');

            this.formEl.classList.add('d-none');
        }
    }

    /**
     * On ok Response.
     *
     * @param {Object} body Response Body.
     */
    onError(body) {
        const errors = errorTextGen(body.error.map((error) => {
            const field = this.fields.find(fField => fField.id === error.field);

            field.highlight();

            return { ...error, field };
        }));

        errorRenderer(errors, this.errorPanel);
    }

    /**
     * Request Builder.
     */
    bodyBuilder() {
        return this.fields.reduce((body, field) => {
            field.clearHighlight();
            body[field.id] = field.value;
            return body;
        }, {});
    }

    /**
     * Add Fields.
     *
     * @param {Array} fields Form fields.
     */
    addFields(fields) {
        const previousFields = this.fields || [];

        this.fields = [
            ...previousFields,
            ...fields,
        ];
    }
}


export default Form;
