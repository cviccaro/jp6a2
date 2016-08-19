import { Component } from '@angular/core';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { ContentOverlayComponent, IconButtonComponent, PostComponent, BlogService } from '../../shared/index';

@Component({
	moduleId: module.id,
	selector: 'jp-blogs',
	templateUrl: './blogs.component.html',
	styleUrls: [ './blogs.component.css' ],
	directives: [ ContentOverlayComponent, MD_TOOLBAR_DIRECTIVES, IconButtonComponent, PostComponent ]
})
export class BlogsComponent {
	blogs: any;
	finished = false;

	constructor(public blogService: BlogService) {
		console.log('BLogsComponent constructed', this);
	}

	ngOnInit() {
		this.blogService.recent(0, 3)
			.subscribe(res => {
				this.blogs = res;
				console.log(this.blogs);
			});
	}
}
