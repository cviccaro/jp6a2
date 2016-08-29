import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizationService, SafeHtml} from '@angular/platform-browser';
import { Subscription } from 'rxjs/Rx';

import { ContentOverlayComponent, Project, WorkService, GalleryComponent, CacheService } from '../../shared/index';

@Component({
	moduleId: module.id,
	selector: 'jp-project',
	templateUrl: './project.component.html',
	styleUrls: [ './project.component.css' ],
	directives: [ ContentOverlayComponent, GalleryComponent ]
})
export class ProjectComponent implements OnInit, OnDestroy {
	ready = false;
	project: Project;

	private sub: Subscription;

	constructor(
		public cache: CacheService,
		public workService: WorkService,
		public route: ActivatedRoute,
		public sanitizer: DomSanitizationService
	) { }

	ngOnInit() {
		if (this.cache.has('project')) {
			this.project = this.cache.get('project');
			this.fetchComplete();
		} else {
			const slug = this.route.snapshot.params['slug'];

			this.sub = this.workService.find(slug)
				.subscribe(res => {
					this.project = res;
					this.fetchComplete();
				});
		}
	}

	fetchComplete() {
		this.ready = true;

		document.title = `JP Enterprises | Project | ${this.project.title}`;
	}

	trust(v: string): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(v);
	}

	ngOnDestroy() {
		if (this.sub) this.sub.unsubscribe();
	}
}
