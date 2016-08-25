import {Component} from '@angular/core';
import {MobileMenuService} from './mobile-menu.service';

@Component({
	selector: 'jp-mobile-menu-trigger',
	moduleId: module.id,
	styleUrls: ['./mobile-menu-trigger.component.css'],
	template: `
		<button md-icon-button class="mobile-menu-trigger" (click)="openMenu()">
			<md-icon>menu</md-icon>
		</button>
	`
})

export class MobileMenuTriggerComponent {
	constructor(private _service: MobileMenuService) { }

	openMenu() {
		this._service.open();
	}
}
