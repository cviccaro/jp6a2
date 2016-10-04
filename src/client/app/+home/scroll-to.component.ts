import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

declare var jQuery: any;

@Component({
	selector: 'jp-scroll-to',
	template: ''
})
export class ScrollToComponent implements AfterViewInit, OnDestroy {
	delay = 100;

	private sub: Subscription;

	constructor(public route: ActivatedRoute) { }

	ngAfterViewInit() {
		this.sub = this.route.params.subscribe(params => {
			if (params.hasOwnProperty('selector')) {
				let el = document.getElementById(params['selector'].replace('-', '_'));

				if (el) {
					setTimeout(() => this.scrollToEl(el, 0), this.delay);
				}
			}
		});
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
	}
}
