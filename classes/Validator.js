export default class Validator {

    static error(message) {
        let data = {
            error: true,
            message: message,
        }

        return data;
    }

    static htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    static success = {
        success: true,
    }

    static validate(type, value) {
        switch (type) {
            case 'text':
                return this.validateText(value);
            case 'password':
                console.log('password: ', value);
                return this.validatePassword(value);
            default:
                console.log('default in switch');
                return this.error('An error occurred. An input with an invalid field type was found.')
        }
    }

    static validatePassword(value) {
        let data = value.trim();

        if (data.length < 8 || data.length > 20) {
            return this.error('Password must be between 8 and 20 characters');
        }

        let numbers = /[0-9]/g;
        if (!data.match(numbers)) {
            return this.error('Password must contain at least one number');
        }

        let uppercase = /[A-Z]/g;
        if (!data.match(uppercase)) {
            return this.error('Password must contain at least one uppercase letter');
        }

        // data = this.htmlEntities(data);
        return data;
    }

    static validateText(value) {
        console.log('value in validateText', value);
        let data = value.trim();
        data = this.htmlEntities(data);

        if (data.length < 2) {
            return this.error('Must be at least two characters');
        }

        if (data.length > 255) {
            return this.error('The maximum allowed characters is 255');
        }

        return data;
    }
} //validator