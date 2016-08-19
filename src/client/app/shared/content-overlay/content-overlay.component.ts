import {Component, OnInit, Input, ElementRef, AfterViewInit, HostBinding} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import {NavbarService} from '../navbar/navbar.service';
import {ScrollService} from '../scroll/scroll.service';

declare var jQuery: any;

@Component({
	moduleId: module.id,
	selector: 'jp-content-overlay',
	styleUrls: ['./content-overlay.component.css'],
	directives: [MD_BUTTON_DIRECTIVES, MD_ICON_DIRECTIVES, MD_TOOLBAR_DIRECTIVES],
	templateUrl: './content-overlay.component.html'
})

export class ContentOverlayComponent implements OnInit, AfterViewInit {
	returnTo: string;

	@Input() title: string;

	@HostBinding('id') htmlId = 'content-overlay';
	@HostBinding('class.active') isActive = false;
	@HostBinding('hidden') isHidden = true;

	constructor(
		public el: ElementRef,
		private _router: Router,
		private _route: ActivatedRoute,
		private _scrollService: ScrollService
		private _navbarService: NavbarService,
	) {
		//
	}

	ngOnInit() {
		console.info('ContentOverlayComponent initalized', this);
		this._route.data.subscribe(params => {
			if (params.hasOwnProperty('returnTo')) {
				this.returnTo = params['returnTo'];
			}
		});
	}

	ngAfterViewInit() {
		this.open();
	}

	close() {
		console.log('close', this);
		document.body.classList.remove('scroll-disabled');
		document.body.style.top = '';

		window.scrollTo(0, this._scrollService.getLastScrollPos());

		this.isActive = false;
		this.isHidden = true;

		this._navbarService.snapOut();
		this._navbarService.startListening();

		setTimeout(() => {
			if (this.returnTo !== undefined && this.returnTo !== null) {
				console.log('Returning to ', this.returnTo);
				this._router.navigate([this.returnTo]);
			}
		},500);
	}

	open() {
		console.log('open!');
		setTimeout(() => {
			this.isActive = true;
			this.isHidden = false;

			this._navbarService.snapIn();
			this._navbarService.stopListening();

			jQuery(document.body)
				.addClass('scroll-disabled')
				.css('top', -this._scrollService.getLastScrollPos());
		}, 1);
	}
}
