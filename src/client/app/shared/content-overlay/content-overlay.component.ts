import {Component, OnInit, Input, ElementRef, AfterViewInit, HostBinding} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NavbarService} from '../navbar/navbar.service';
import {ScrollService} from '../scroll/scroll.service';
import { Config } from '../config/env.config';
declare var jQuery: any;

@Component({
	moduleId: module.id,
	selector: 'jp-content-overlay',
	styleUrls: ['./content-overlay.component.css'],
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
		public router: Router,
		public route: ActivatedRoute,
		public scrollService: ScrollService,
		public navbarService: NavbarService
	) {
		//
	}

	ngOnInit() {
		this.route.data.subscribe(params => {
			if (params.hasOwnProperty('returnTo')) {
				this.returnTo = params['returnTo'];
			}
		});
	}

	ngAfterViewInit() {
		this.open();
	}

	close() {
		document.body.classList.remove('scroll-disabled');
		document.body.style.top = '';

		window.scrollTo(0, this.scrollService.getLastScrollPos());

		this.isActive = false;
		this.isHidden = true;

		if (window.innerWidth >= Config.desktopWidth) {
			this.navbarService.snapOut();
			this.navbarService.startListening();
		} else {
			this.navbarService.unsnap();
		}

		setTimeout(() => {
			if (this.returnTo !== undefined && this.returnTo !== null) {
				this.router.navigate([this.returnTo]);
			}
		},500);
	}

	open() {
		setTimeout(() => {
			this.isActive = true;
			this.isHidden = false;

			this.navbarService.snapIn();
			this.navbarService.stopListening();

			jQuery(document.body)
				.addClass('scroll-disabled')
				.css('top', -this.scrollService.getLastScrollPos());
		}, 1);
	}
}
