export default class Label {
    constructor(id, name) {
        this.attributes = [];
        this.id = id;
        this.name = name;
    }

    getLabel() {
        let label = document.createElement('label');
        label.id = this.id + '-label';
        label.textContent = this.name;
        label.setAttribute('for', this.id);
        return label;
    }
}