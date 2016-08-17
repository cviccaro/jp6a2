import {Component, Input, OnInit, ElementRef} from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
	selector: 'jp-social-icons',
	moduleId: module.id,
	templateUrl: './social-icons.component.html',
	styleUrls: ['./social-icons.component.css'],
	directives: [NgSwitch, NgSwitchCase, NgSwitchDefault]
})
export class SocialIconsComponent implements OnInit {
	@Input() jpSocialIconsVertical = false;

	layout = 'row';

	constructor(private _el: ElementRef) { }

	ngOnInit() {
		if (this.jpSocialIconsVertical) {
			this.layout = 'column';
		}
		this._el.nativeElement.children[0].setAttribute('layout', this.layout);
	}
}
