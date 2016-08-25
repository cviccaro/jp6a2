import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { NavbarService } from './navbar.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'jp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	constructor(public navbarService: NavbarService, public el: ElementRef) { }

	ngOnInit() {
		this.navbarService.register(this.el);
		this.navbarService.startListening();
	}

	@HostListener('document:scroll')
	onScroll() {
		this.navbarService.onScroll();
	}
}
