import Field from './Field.js';

export default class Input extends Field {
    #allowedTypes = [
        'text',
        'password',
    ];

    constructor(id, name, type) {
        super(id, name, 'input');
        this.type = this.#allowedTypes.includes(type) ? type : 'text';
    }
 
}