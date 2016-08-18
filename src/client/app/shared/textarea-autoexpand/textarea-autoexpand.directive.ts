import {Directive, ElementRef, HostListener, AfterViewInit} from '@angular/core';

declare var jQuery: any;

const keyCodes = {
	ENTER: 13,
	BACKSPACE: 8,
	DELETE: 46
};

@Directive({
	selector: '[jpTextareaAutoexpand]'
})

export class TextareaAutoexpandDirective implements AfterViewInit {
	lineHeight: number;
	height: number;
	diff: number;
	empty: boolean = false;

	constructor(private _el: ElementRef) { }

	ngAfterViewInit() {
		this._el.nativeElement.style.height = '48px';
	}

	@HostListener('focus', ['$event'])
	onFocus() {
		let $label = jQuery(this._el.nativeElement).prev();
		$label.addClass('md-focused');
	}

	@HostListener('blur', ['$event'])
	onBlur() {
		let $label = jQuery(this._el.nativeElement).prev();
		$label.removeClass('md-focused');
		this.handleEmpty();
	}

	@HostListener('keydown', ['$event'])
	onkeydown(e: any) {
		if (e.keyCode === keyCodes.ENTER || e.keyCode === keyCodes.BACKSPACE || e.keyCode === keyCodes.DELETE) {
			// Get the line-height
			if (this.lineHeight === undefined) {
				if (this._el.nativeElement.currentStyle) {
					this.lineHeight = this._el.nativeElement.currentStyle['line-height'];
				} else if (window.getComputedStyle) {
					this.lineHeight = parseInt(document.defaultView.getComputedStyle(this._el.nativeElement).getPropertyValue('line-height'));
				}
			}
			// Get the height
			if (this.height === undefined) {
				this.height = this._el.nativeElement.offsetHeight;
			}
			// Calculate the difference
			if (this.diff === undefined) {
				this.diff = this.height - this.lineHeight;
			}

			let newLines = this._el.nativeElement.value.split(/[\r\n]+/g).length || 1;
			if (e.keyCode === 13) {	newLines++;	}

			let newHeight = (this.lineHeight + (this.diff / 2)) * newLines;
			if (newHeight < 48) newHeight = 48;
			if (newHeight !== this._el.nativeElement.offsetHeight) {
				jQuery(this._el.nativeElement).animate({ height: newHeight });
			}
		}
		this.handleEmpty();
	}

	handleEmpty() {
		let $label = jQuery(this._el.nativeElement).prev();
		this.empty = !this._el.nativeElement.value.length;

		if (this.empty) {
			$label.addClass('md-empty');
		} else {
			$label.removeClass('md-empty');
		}
	}
}
