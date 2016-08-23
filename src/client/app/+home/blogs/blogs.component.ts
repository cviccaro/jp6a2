import { Component, OnInit } from '@angular/core';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { ContentOverlayComponent, IconButtonComponent, PostComponent, BlogService } from '../../shared/index';

@Component({
	moduleId: module.id,
	selector: 'jp-blogs',
	templateUrl: './blogs.component.html',
	styleUrls: [ './blogs.component.css' ],
	directives: [ ContentOverlayComponent, MD_TOOLBAR_DIRECTIVES, IconButtonComponent, PostComponent, MD_BUTTON_DIRECTIVES ]
})
export class BlogsComponent implements OnInit {
	blogs: any;
	perPage = 12;
	index = 0;
	finished = false;
	divisionFilter: string = null;

	constructor(public blogService: BlogService) { }

	ngOnInit() {
		this.getBlogs();
	}

	getBlogs() {
		this._fetchBlogs()
			.subscribe(res => {
				this.blogs = res;
			});
	}

	filterByDivision(division: string) {
		this.divisionFilter = division;
		this.index = 0;
		this.finished = false;
		this.getBlogs();
		return false;
	}

	more() {
		this.index += this.perPage;

		this._fetchBlogs(this.index)
			.subscribe(res => {
				this.blogs.blogs = this.blogs.blogs.concat(res.blogs);
				this.finished = !(res.remaining > 0);
			});

		return false;
	}

	private _fetchBlogs(skip: number = 0) {
		return this.blogService.recent(skip, this.perPage, this.divisionFilter);
	}
}
