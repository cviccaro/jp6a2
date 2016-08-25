import {Component} from '@angular/core';
import {MobileMenuService} from './mobile-menu.service';
import {NavbarService} from '../navbar.service';

@Component({
	selector: 'jp-mobile-menu',
	moduleId: module.id,
	templateUrl: './mobile-menu.component.html',
	styleUrls: ['./mobile-menu.component.css']
})

export class MobileMenuComponent {

	constructor(private _service: MobileMenuService, private _navbarService: NavbarService) {	}

	closeMenu() {
		this._service.close();
		this._navbarService.unsnap();
	}

	isActive() {
		return this._service.isActive();
	}
}
