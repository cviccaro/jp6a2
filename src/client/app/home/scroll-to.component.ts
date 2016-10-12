import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { CacheService, NavbarService } from '../shared/index';

declare var jQuery: any;

@Component({
	selector: 'jp-scroll-to',
	template: ''
})
export class ScrollToComponent implements AfterViewInit, OnDestroy {
	config: any;
	delay = 100;
	currentSelector: string;

	private sub: Subscription;
	private sub2: Subscription;

	constructor(public route: ActivatedRoute, public title: Title, public cache: CacheService, public navbar: NavbarService) {
		this.config = this.cache.get('config');
	}

	ngAfterViewInit() {
		this.sub = this.route.params.subscribe(params => {
			if (params.hasOwnProperty('selector')) {
				this.scrollToSelector(params['selector']);
			}
		});

		this.sub2 = this.navbar.buttonClicked.subscribe((e: {target: HTMLElement, selector: string}) => {
			if (this.currentSelector === e.selector) {
				this.scrollToSelector(e.selector);
			}
		});
	}

	capitalize(text: string) {
		return text.substr(0,1).toUpperCase() + text.substr(1,text.length-1);
	}

	scrollToSelector(selector: string) {
		let el = document.getElementById(selector.replace('-', '_'));

		if (el) {
			this.currentSelector = selector;

			let title = this.capitalize(selector.replace('-', ' '));

			this.title.setTitle(`${this.config['main_site_title']} | ${title}`);

			setTimeout(() => this.scrollToEl(el, 0), this.delay);
		}
	}

	scrollToEl(el: HTMLElement, offset = 45) {
		let top = el.offsetTop;
		jQuery('html, body').animate({
			scrollTop: top + offset
		});
		if (this.delay) this.delay = 0;
	}

	ngOnDestroy() {
		if (this.sub) this.sub.unsubscribe();
		if (this.sub2) this.sub2.unsubscribe();
	}
}
