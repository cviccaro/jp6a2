import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Directive({
	selector: '[jpScrollIf]'
})
export class ScrollIfDirective implements OnInit {
	delay = 1000;

	@Input() jpScrollIf: string;

	constructor(public route: ActivatedRoute, public el: ElementRef) { }

	ngOnInit() {
		setTimeout(() => this.delay = 0, 1500);
		console.log(this.route.snapshot);
		// this.route.params.subscribe(params => {
		// 	console.log(params['selector'], this.jpScrollIf);
		//   if (params.hasOwnProperty('selector') && params['selector'] === this.jpScrollIf) {
		//   	setTimeout(() => this.scrollToMe(), this.delay);
		//   }
		// });
	}

	scrollToMe() {
		let top = this.el.nativeElement.offsetTop;
		jQuery('html, body').animate({
			scrollTop: top + 120
		});
	}
}
