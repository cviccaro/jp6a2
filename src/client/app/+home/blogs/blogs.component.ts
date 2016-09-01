import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BlogService, CacheService } from '../../shared/index';

import { Subscription } from 'rxjs/Rx';

@Component({
	moduleId: module.id,
	selector: 'jp-blogs',
	templateUrl: './blogs.component.html',
	styleUrls: [ './blogs.component.css' ]
})
export class BlogsComponent implements OnInit, OnDestroy {
	blogs: any;
	perPage = 12;
	index = 0;
	finished = false;
	divisionFilter: string = null;

	private subs: Subscription[] = [];

	constructor(public blogService: BlogService, public cache: CacheService, public title: Title) { }

	ngOnInit() {
		this.blogs = this.cache.get('blogs');

		this.title.setTitle('JP Enterprises | Blogs');
	}

	getBlogs() {
		this.subs.push(
			this._fetchBlogs()
				.subscribe(res => {
					this.blogs = res;
				})
		);
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

		this.subs.push(
				this._fetchBlogs(this.index)
					.subscribe(res => {
						this.blogs.blogs = this.blogs.blogs.concat(res.blogs);
						this.finished = !(res.remaining > 0);
					})
		);

		return false;
	}

	ngOnDestroy() {
		this.subs.forEach(sub => {
			if (sub) sub.unsubscribe();
		});
	}

	private _fetchBlogs(skip: number = 0) {
		return this.blogService.recent(skip, this.perPage, this.divisionFilter);
	}
}
