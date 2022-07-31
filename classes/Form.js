export default class Form {
    constructor(id, name, fields = [], attributes = {} ) {
        this.attributes = attributes;
        this.errors = [];
        this.fields = fields;
        this.id = id;
        this.name = name;
        this.settings = {
            showTitle: true,
        };
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getForm() {
        var formEl = document.createElement('form');
        formEl.id = this.id;
        formEl.onsubmit = (e) => {
            e.preventDefault();
            this.submit(e);
        }

        if (this.settings.showTitle) {
            let titleEl = document.createElement('h2');
            titleEl.textContent = this.name;
            titleEl.className = "form-title";
            formEl.appendChild(titleEl);
        }

        Object.keys(this.attributes).forEach( (key) => {
            formEl.setAttribute(key, this.attributes[key] );
        });

        this.fields.forEach(field => {
            let fieldEl = field.getField();
            formEl.appendChild(fieldEl);
        });

        var btnEl = document.createElement('input');
        btnEl.type = 'submit';
        btnEl.value = 'Submit';
        formEl.appendChild(btnEl);
        
        console.log(formEl);
        return formEl;
    }

    submit(e) {
        let data = {};

        this.fields.forEach(field => {
            console.log('field.validate: ', field.validate());
            let validation = field.validate();
            
            if (validation.error) {
                this.errors.push(validation.message);
            }
            else {
                data[field.id] = validation;
            }
        });

        if (this.errors.length > 0) {
            //do nothing
        }
        else {
            console.log('formData', data);
            //clear form
            //do something with the data
        }
    }
}