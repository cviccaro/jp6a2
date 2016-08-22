import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
	selector: 'jp-scroll-to',
	template: ''
})
export class ScrollToComponent implements AfterViewInit {
	delay = 100;

	constructor(public route: ActivatedRoute) { }

	ngAfterViewInit() {
		this.route.params.subscribe(params => {
			if (params.hasOwnProperty('selector')) {
				let el = document.getElementById(params['selector']);
				let offset = -45;

				if (params['selector'] === 'projects') {
					offset = 0;
				}
				if (el) {
					setTimeout(() => this.scrollToEl(el, offset), this.delay);
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
}
