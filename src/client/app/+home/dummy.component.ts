import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
	selector: 'jp-dummy',
	template: ''
})
export class DummyComponent implements OnInit {
	delay = 1000;

	constructor(public route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			if (params.hasOwnProperty('selector')) {
			 	let selector = params['selector'];
			 	let el = document.getElementById(selector);
			 	if (el) {
			 		console.log('scroll wuth delay ', this.delay);
			 		setTimeout(() => this.scrollToEl(el), this.delay);
			 	}
			 }
		});
	}

	scrollToEl(el: HTMLElement) {
		let top = el.offsetTop;
		jQuery('html, body').animate({
			scrollTop: top + 120
		});
		if (this.delay === 1000) this.delay = 0;
	}
}
