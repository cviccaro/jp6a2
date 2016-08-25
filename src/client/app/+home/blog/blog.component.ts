import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizationService, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';

import { Blog, BlogService } from '../../shared/index';

declare var jQuery: any;

@Component({
	moduleId: module.id,
	selector: 'jp-blog',
	templateUrl: './blog.component.html',
	styleUrls: [ './blog.component.css' ],
})
export class BlogComponent implements OnInit {
	first = true;
	ready = false;
	blog: Blog;
	related: Blog[];
	shareUrl: SafeResourceUrl;

	@ViewChild('title') public titleEl: ElementRef;

	constructor(
		public blogService: BlogService,
		public route: ActivatedRoute,
		public sanitizer: DomSanitizationService
	) {
		this.route.params.subscribe(params => {
			if (!this.first) {
				if (params.hasOwnProperty('slug')) {
					this.fetchBlog(params['slug']);
					setTimeout(() => {
						jQuery('jp-content-overlay').animate({scrollTop: this.titleEl.nativeElement.offsetTop});
					});
				}
			} else {
				this.first = false;
			}
		});
	}

	ngOnInit() {
		const slug = this.route.snapshot.params['slug'];
		this.fetchBlog(slug);
	}

	fetchBlog(slug: string) {
		this.blogService.find(slug)
			.subscribe(res => this.handleResponse(res));
	}

	handleResponse(res: any) {
		this.blog = res;
		document.title = `JP Enterprises | Blog | ${this.blog.title}`;

		this.shareUrl = this.buildUrl(this.blog.uri);
		this.ready = true;

		this.blogService.related(this.blog.id)
			.subscribe(res => {
				this.related = res;
			});
	}

	trust(v: string): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(v);
	}

	buildUrl(uri: string) {
		return `${window.location.protocol}//${window.location.hostname}/blogs/${uri}`;
	}
}
