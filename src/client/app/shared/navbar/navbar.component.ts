import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { NavbarService } from './navbar.service';
/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'jp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  directives: [ROUTER_DIRECTIVES, MD_BUTTON_DIRECTIVES]
})
export class NavbarComponent implements OnInit {
	constructor(public navbarService: NavbarService, public el: ElementRef) { }

	ngOnInit() {
		this.navbarService.register(this.el);
	}

	@HostListener('document:scroll')
	onScroll() {
		this.navbarService.onScroll();
	}
}
