import { Directive, ElementRef, OnInit, Input, Renderer, HostListener } from '@angular/core';

@Directive({
	selector: '[jpBackground]'
})
export class BackgroundDirective implements OnInit {
	@Input() jpBackground: string;

	private elem: HTMLElement;
	private hasParallax: boolean = false;

	constructor(public el: ElementRef, public renderer: Renderer) {
		this.elem = this.el.nativeElement;
	}

	@HostListener('document:scroll')
	onScroll() {
		if (this.hasParallax) {
			let scrolledTo = window.pageYOffset,
				elemYOffset = this.elem.offsetTop,
				bottomOfWindow = scrolledTo + window.innerHeight;

			if (elemYOffset <= bottomOfWindow) {
				let base = this.elem.offsetHeight;
				// Accelerated parallax
				let multiplier = Math.min(0.5, (Math.abs(scrolledTo - elemYOffset) / base) * 0.5);
				let pixels = Math.max(0, (scrolledTo - elemYOffset) * multiplier);

				this.renderer.setElementStyle(this.elem, 'backgroundPosition', '50% -' + pixels + 'px');
			}
		}
	}

	ngOnInit() {
		this.renderer.setElementClass(this.elem, 'has-background', true);
		this.renderer.setElementStyle(this.elem, 'backgroundImage', 'url(' + this.jpBackground + ')');

		this.hasParallax = this.elem.hasAttribute('background-parallax');

		if (this.hasParallax) {
			this.renderer.setElementClass(this.elem, 'parallax', true);
		}
	}
}
