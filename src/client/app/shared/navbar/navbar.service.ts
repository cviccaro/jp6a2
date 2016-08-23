import { Injectable, ElementRef } from '@angular/core';

declare var jQuery: any;

@Injectable()
export class NavbarService {
	animatingHide = false;
	animatingShow = false;
	el: ElementRef;
	elemTop: number;
	elemBottom: number;
	$elem: any;
	$nav: any;
	listening = false;
	lastScrollPos: number;
	lastDirection: string;
	snapped = false;
	showTimer: any;
	hideTimer: any;
	transitionEvents = 'transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd mozTransitionEnd';

	onScroll() {
		if (this.$elem && this.listening && window.pageYOffset > 0) {
			let scrollY = window.pageYOffset;
			let direction = (scrollY < this.lastScrollPos) ? 'up' : 'down';

			this.lastScrollPos = window.pageYOffset;

			if (scrollY > this.elemBottom && this.lastDirection === direction) {
				if (!this.$elem.hasClass('snapped') && !this.animatingShow) {
				    this.snapIn();
				}
				// if (direction === 'up' && !this.$elem.hasClass('snapped') && !this.animatingShow) {
				// 	this.snapIn();
				// } else if (direction === 'down' && this.$elem.hasClass('snapped') && !this.animatingHide) {
				// 	this.snapOut();
				// }
			} else if (scrollY <= this.elemTop && this.$elem.hasClass('snapped')) {
				this.unsnap();
			}

			this.lastDirection = direction;
		}
	}


	isSnapped() {
		return this.snapped;
	}

	killTimers() {
		// if (this.hideTimer) {
		// 	clearTimeout(this.hideTimer);
		// }
		// if (this.showTimer) {
		// 	clearTimeout(this.showTimer);
		// }
	}

	register(el: ElementRef) {
		this.el = el;
		this.$elem = jQuery(this.el.nativeElement);

		if (!this.$elem.parent().is('nav')) {
			this.$elem.wrap('<nav></nav>');
		}
		this.$nav = this.$elem.parent();

		setTimeout(() => {
			this.elemTop = this.$nav.offset().top;
			this.elemBottom = this.$nav.offset().top + this.$elem.outerHeight();
		}, 1);
	}

	snapIn() {
		let that = this;

		this.animatingShow = true;
		this.killTimers();

		this.$elem
			.removeClass('snap-out snap-out-active')
			.addClass('snap-in snapped');

		this.showTimer = setTimeout(() => {
		    this.$elem
				.on(this.transitionEvents, function(e: Event) {
					if (e.target === this) {
						that.$elem.unbind(that.transitionEvents);
						that.animatingShow = false;
						that.snapped = true;
					}
				})
				.addClass('snap-in-active');
		}, 250);
	}

	snapOut() {
		let that = this;
		let transitionEvents = this.transitionEvents;

		this.animatingHide = true;
		this.killTimers();

		this.hideTimer = setTimeout(() => {
			this.$elem.removeClass('snap-in snap-in-active snapped').addClass('snap-out');
			setTimeout(() => {
				this.$elem.on(transitionEvents,
					function(e: Event) {
						if (e.target === this) {
							that.$elem.unbind(transitionEvents);
							that.animatingHide = false;
							that.snapped = true;
						}
					}
				)
					.addClass('snap-out-active');
			});
		}, 250);
	}

	startListening() {
		this.listening = true;
	}

	stopListening() {
		this.listening = false;
	}

	unsnap() {
		this.$elem.removeClass('snapped snap-in snap-in-active snap-out snap-out-active');
	}
}
