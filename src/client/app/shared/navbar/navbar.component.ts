import { Component, OnInit, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { NavbarService } from './navbar.service';
import { XhrService } from './../xhr/xhr.service';

import { Subscription } from 'rxjs/Rx';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'jp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
	subs: Subscription[];
	working = false;

	constructor(public navbarService: NavbarService, public el: ElementRef, public xhr: XhrService) { }

	ngOnInit() {
		this.navbarService.register(this.el);
		this.navbarService.startListening();

		this.subs = [
			this.xhr.started.subscribe(() => this.working = true),
			this.xhr.done.subscribe(() => this.working = false)
		];
	}

	@HostListener('document:scroll')
	onScroll() {
		this.navbarService.onScroll();
	}

	ngOnDestroy() {
		this.subs.forEach(sub => {
		  if (sub) sub.unsubscribe();
		});
	}
}
