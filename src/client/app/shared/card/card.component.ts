import {Component, Input} from '@angular/core';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {HoverDynamicsDirective} from '../hover-dynamics/index';

@Component({
	selector: 'jp-card',
	moduleId: module.id,
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css'],
	directives: [HoverDynamicsDirective, NgSwitch, NgSwitchCase, NgSwitchDefault]
})
export class CardComponent {
	@Input() cardTitle: string;
	@Input() subTitle: string;
	@Input() image: any;
	@Input() overlay: any;
	@Input() url = '#';
	@Input() routerLink: any;
}
