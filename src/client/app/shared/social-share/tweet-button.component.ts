import { Component, OnInit, OnChanges, ElementRef, Renderer, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
	moduleId: module.id,
	selector: 'jp-tweet-button',
	template: '',
	styles: [ ':host { display: inline-block; height: 25px; width: 60px; overflow: hidden; }' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TweetButtonComponent implements OnInit, OnChanges {
	@Input() url: string;
	@Input() text: string = 'Tweet';

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
    script.src = '//platform.twitter.com/widgets.js';

    this.renderer.listen(script, 'load', () => {
      this.renderShareButton().subscribe((res: any) => {
      	//
      });
  	});
	}

	renderShareButton() {
		return Observable.create((observer: any) => {
			let twttr = (window as any).twttr;

			twttr.widgets.createShareButton(this.url, this.el.nativeElement)
				.then((el: HTMLIFrameElement) => {
					el.style.visibility = null;
					el.style.height = null;
					el.style.width = null;
					observer.next(el);
					observer.complete();
				});
			});
	}
}
