import { Component, OnInit, OnChanges, ElementRef, ViewChild, Renderer, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

var first = true;

@Component({
	moduleId: module.id,
	selector: 'jp-linkedin-button',
	template: '',
	styles: [ ':host { display: inline-block; height: 25px; width: 60px; overflow: hidden; }' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkedInButtonComponent implements OnInit, OnChanges {
	button: any;
	rendering = false;

	@Input() url: string;

	@ViewChild('btn') public btnEl: ElementRef;

	constructor(public el: ElementRef, public renderer: Renderer) {	}

	ngOnInit() {
		this.loadWidget();
	}

	ngOnChanges() {
		this.loadWidget();
	}

	loadWidget() {
		if (first) {
			let script = this.renderer.createElement(this.el.nativeElement, 'script');
	    script.src = '//platform.linkedin.com/in.js';
	    first = false;

	    this.renderer.listen(script, 'load', () => this.renderWidget());
		} else {
			this.renderWidget();
		}
	}

	renderWidget() {
		if (this.rendering || this.button) return;

		this.rendering = true;

		this.renderShareButton().subscribe((res: any) => {
			this.rendering = false;
		});
	}

	renderShareButton() {
		return Observable.create((observer: any) => {
			this.button = this.renderer.createElement(this.el.nativeElement, 'script');

			this.button.type = 'IN/Share';
			this.button.dataset.url = this.url;
			this.button.dataset.counter = 'right';

			observer.next(this.button);
			observer.complete();
		});
	}
}
