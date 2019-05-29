import Field from './fields/Field';
import ReferenceField from './fields/ReferenceField';
import CheckField from './fields/CheckField';

import Form from './Form';
import Modal from './Modal';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const FIELDS = [
    new Field('firstName', /.{1,30}/s),
    new Field('lastName', /.{1,30}/s),
    new Field('phone', /\d{1,30}/s),
    new Field('email', /\S+@\S+\.\S+/s),
    new Field('promo', /([a-z0-9]){0,7}/s),
    new ReferenceField('ref', /.{1,255}/s),
    new CheckField('terms'),
];

const form = new Form('form');
form.addFields(FIELDS);

const modal = new Modal('terms-modal');
