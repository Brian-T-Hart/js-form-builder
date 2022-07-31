import Label from "./Label.js";
import Validator from './Validator.js';

export default class Field {
    constructor(id, name, fieldType) {
        this.attributes = [];
        this.fieldType = fieldType;
        this.id = id;
        this.name = name;
        this.settings = {
            showLabel: false,
        };
    }

    clearValue() {
        document.getElementById(this.id).value = '';
    }

    getField() {
        let field = document.createElement('div');
        field.className = 'field-wrapper';

        if (this.settings.showLabel) {
            let label = new Label(this.id, this.name);
            field.appendChild(label.getLabel());
        }

        let fieldEl = document.createElement(this.fieldType);
        fieldEl.id = this.id;
        fieldEl.name = this.id;
        fieldEl.type = this.type;

        Object.keys(this.attributes).forEach( (key) => {
            fieldEl.setAttribute(key, this.attributes[key] );
        });

        field.appendChild(fieldEl);

        let errorEl = document.createElement('p');
        errorEl.id = this.id + '-warning';
        errorEl.className = 'warning marg-t-0';
        // errorEl.textContent = 'Warning goes here';
        field.appendChild(errorEl);

        return field;
    }

    getValue() {
        let fieldValue = document.getElementById(this.id).value;
        return fieldValue;
    }

    showInfo() {
        return this;
    }

    validate() {
        let result = Validator.validate(this.type, this.getValue());
        console.log(result);
        let warningElId = this.id + '-warning';
        let warningEl = document.getElementById(warningElId);
        if (result.error) {
            warningEl.textContent = result.message
        }
        else {
            warningEl.textContent = '';
        }

        return result;
    }
}
