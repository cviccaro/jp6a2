import { Injectable } from '@angular/core';

declare var jQuery: any;

@Injectable()
export class ScrollService {
	private _lastScrollPos = 0;

	constructor() {
		window.addEventListener('scroll', (e) => {
			if (window.pageYOffset !== 0) {
				this._lastScrollPos = window.pageYOffset;
			}
		});
	}

	getLastScrollPos() {
		return this._lastScrollPos;
	}

	scrollToElementAnimated(el: HTMLElement, duration: number = 1000, delay: number = 0, offset: number = 0) {
		setTimeout(() => {
			jQuery('html, body').animate({
				scrollTop: el.offsetTop + offset
			}, duration);
		}, delay);
	}
}
