import {Injectable} from '@angular/core';

declare var jQuery: any;

@Injectable()
export class MobileMenuService {
	private _active = false;
	private _lastScrollPos = 0;

	isActive() {
		return this._active;
	}

	close() {
		this._active = false;

		jQuery(document.body)
			.removeClass('scroll-disabled')
			.css('top', '');

		window.scrollTo(0, this._lastScrollPos);
	}

	open() {
		this._active = true;
		this._lastScrollPos = window.pageYOffset;

		jQuery(document.body)
			.addClass('scroll-disabled')
			.css('top', -this._lastScrollPos);
	}
}
