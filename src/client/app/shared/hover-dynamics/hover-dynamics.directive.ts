import {Directive, Input, HostListener, ElementRef} from '@angular/core';

declare var dynamics: any;

@Directive({
	selector: '[jpHoverDynamics]'
})
export class HoverDynamicsDirective {
	@Input() hoverDynamicsAnimation = 'bounce';

	private _elem: HTMLElement;

	constructor(private _el: ElementRef) {
		this._elem = _el.nativeElement;
	}

	@HostListener('mouseenter')
	onMouseEnter() {
		dynamics.css(this._elem, {
			scale: 1
		});
		dynamics.animate(this._elem, {
			scale: 0.9
		}, { type: dynamics[this.hoverDynamicsAnimation] });
	}
}
