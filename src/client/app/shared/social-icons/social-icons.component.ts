import {Component, Input, ElementRef} from '@angular/core';

@Component({
	selector: 'jp-social-icons',
	moduleId: module.id,
	templateUrl: './social-icons.component.html',
	styleUrls: ['./social-icons.component.css']
})
export class SocialIconsComponent {
	@Input() layout = 'horizontal';

	constructor(private _el: ElementRef) { }
}
