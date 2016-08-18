import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class EmailValidator {
	static emailFormat(control: FormControl) {
		var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

		console.log('Is this value an email? ', {
			control: control,
			value: control.value,
			match: EMAIL_REGEXP.test(control.value)
		});

    if (control.value !== '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
        return {
        	validateEmail: {
        		valid: false
        	}
        };
    }
		return null;
	}
}
