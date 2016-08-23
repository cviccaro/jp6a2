import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizationService, SafeHtml} from '@angular/platform-browser';

import { ContentOverlayComponent, Blog, BlogService, BackgroundDirective, PostComponent } from '../../shared/index';

@Component({
	moduleId: module.id,
	selector: 'jp-blog',
	templateUrl: './blog.component.html',
	styleUrls: [ './blog.component.css' ],
	directives: [ ContentOverlayComponent, BackgroundDirective, PostComponent ]
})
export class BlogComponent implements OnInit {
	ready = false;
	blog: Blog;
	related: Blog[];

	constructor(
		public blogService: BlogService,
		public route: ActivatedRoute,
		public sanitizer: DomSanitizationService
	) { }

	ngOnInit() {
		const slug = this.route.snapshot.params['slug'];

		this.blogService.find(slug)
			.subscribe(res => {
				this.blog = res;
				this.ready = true;
				console.log('response from server for blog with slug ' + slug, res);

				this.blogService.related(this.blog.id)
					.subscribe(res => {
						this.related = res;
					});
			});
	}

	trust(v: string): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(v);
	}
}
