import {Component, Input} from '@angular/core';
//import {HoverDynamicsDirective} from '../../directives/hover-dynamics/hover-dynamics.directive';

@Component({
	selector: 'jp-card',
	moduleId: module.id,
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css'],
//	directives: [HoverDynamicsDirective]
})
export class CardComponent {
	@Input() cardTitle: string;
	@Input() subTitle: string;
	@Input() image: any;
	@Input() overlay: any;
	@Input() url = '#';
}
