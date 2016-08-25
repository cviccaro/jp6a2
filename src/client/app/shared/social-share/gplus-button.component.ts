import { Component, OnInit, OnChanges, ElementRef, ViewChild, Renderer, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
	moduleId: module.id,
	selector: 'jp-gplus-button',
	template: '',
	styles: [ ':host { display: inline-block; height: 25px; width: 60px; overflow: hidden; }' ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GooglePlusButtonComponent implements OnInit, OnChanges {
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
		let cfg = this.renderer.createElement(this.el.nativeElement, 'script');
		cfg.innerHTML = '(function() { window.___gcfg = { lang: "en-US", parsetags: "explicit" } })()';

		let script = this.renderer.createElement(this.el.nativeElement, 'script');
    script.src = '//apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;

    this.renderer.listen(script, 'load', () => {
      this.renderShareButton().subscribe((res: any) => {
      	//
      });
  	});
	}

	renderShareButton() {
		return Observable.create((observer: any) => {
			let button = this.renderer.createElement(this.el.nativeElement, 'div');
			button.className = 'g-plus';
			button.dataset.action = 'share';
			button.dataset.href = 'http://www.google.com';

			let gapi = (window as any).gapi;
			gapi.plus.render(button, {width: '300', theme: 'light'});

			observer.next('');
			observer.complete();
		});
	}
}
