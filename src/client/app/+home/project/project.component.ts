import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DomSanitizationService, SafeHtml} from '@angular/platform-browser';

import { ContentOverlayComponent, Project, WorkService, GalleryComponent } from '../../shared/index';

@Component({
	moduleId: module.id,
	selector: 'jp-project',
	templateUrl: './project.component.html',
	styleUrls: [ './project.component.css' ],
	directives: [ ContentOverlayComponent, GalleryComponent ]
})
export class ProjectComponent implements OnInit {
	ready = false;
	project: Project;

	constructor(
		public workService: WorkService,
		public route: ActivatedRoute,
		public sanitizer: DomSanitizationService
	) { }

	ngOnInit() {
		const slug = this.route.snapshot.params['slug'];

		this.workService.find(slug)
			.subscribe(res => {
				this.project = res;
				this.ready = true;

				document.title = `JP Enterprises | Project | ${this.project.title}`;
			});
	}

	trust(v: string): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(v);
	}
}
