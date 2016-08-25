import { Component, OnInit, OnChanges, ElementRef, ViewChild, Renderer, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
	moduleId: module.id,
	selector: 'jp-linkedin-button',
	template: '',
	styles: [ ':host { display: inline-block; height: 25px; width: 60px; overflow: hidden; }' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkedInButtonComponent implements OnInit, OnChanges {
	@Input() url: string;
	@Input() text: string = 'Tweet';

	@ViewChild('btn') public btnEl: ElementRef;

	constructor(public el: ElementRef, public renderer: Renderer) {	}

	ngOnInit() {
		this.loadWidget();
	}

	ngOnChanges() {
		this.loadWidget();
	}

	loadWidget() {
		if (this.el.nativeElement.children.length > 0) {
     	return this.renderShareButton();
		}

		let script = this.renderer.createElement(this.el.nativeElement, 'script');
    script.src = '//platform.linkedin.com/in.js';

    this.renderer.listen(script, 'load', () => {
      this.renderShareButton().subscribe((res: any) => {
      	//
      });
  	});
	}

	renderShareButton() {
		return Observable.create((observer: any) => {
			let button = this.renderer.createElement(this.el.nativeElement, 'script');

			button.type = 'IN/Share';
			button.dataset.url = this.url;
			button.dataset.counter = 'right';

			observer.next(button);
			observer.complete();
		});
	}
}
