import {Component, Output, EventEmitter} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
// import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {FormSubmission, TextareaAutoexpandDirective, EmailValidator} from '../../shared/index';

@Component({
	selector: 'jp-contact-form',
	moduleId: module.id,
	directives: [REACTIVE_FORM_DIRECTIVES, TextareaAutoexpandDirective],
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
	@Output() formSubmitSuccess = new EventEmitter();

	contactForm: FormGroup;
	model = new FormSubmission();

	constructor(builder: FormBuilder) {
		this.contactForm = builder.group({
			first_name: ['', Validators.required],
			last_name: ['', Validators.required],
			company: ['', Validators.required],
			email: ['', [Validators.required, EmailValidator.emailFormat]],
			phone: [''],
			contact_time: [''],
			comments: ['', Validators.required]
		});
	}
	submit() {
		this.model = this.contactForm.value;
		//console.log('submit form', this.model);
		this.formSubmitSuccess.emit(this.model);
	}
}
