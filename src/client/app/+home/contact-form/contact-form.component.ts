import {Component, Output, EventEmitter} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup} from '@angular/forms';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {FormSubmission} from '../../shared/index';
//import {TextareaAutoexpandDirective} from '../../../shared/directives/textarea-autoexpand/textarea-autoexpand.directive';

@Component({
	selector: 'jp-contact-form',
	moduleId: module.id,
	directives: [MD_INPUT_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
	@Output() formSubmitSuccess = new EventEmitter();

	contactForm: FormGroup;
	model = new FormSubmission();

	constructor(builder: FormBuilder) {
		this.contactForm = builder.group({
			first_name: [''],
			last_name: [''],
			company: [''],
			email: [''],
			phone: [''],
			contact_time: [''],
			comments: ['']
		});
	}
	submit() {
		this.model = this.contactForm.value;
		console.log('submit form', this.model);
		this.formSubmitSuccess.emit(this.model);
	}
}
