import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { ScrollToComponent } from './scroll-to.component';
import { BlogComponent } from './blog/blog.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ProjectComponent } from './project/project.component';
import { HomeGuard } from './home.guard';
import { BlogGuard } from './blog/blog.guard';
import { BlogsGuard } from './blogs/blogs.guard';
import { ProjectGuard } from './project/project.guard';

@NgModule({
	imports: [
		SharedModule,
	],
	declarations: [
		HomeComponent,
		BlogComponent,
		BlogsComponent,
		ProjectComponent,
		ScrollToComponent
	],
	exports: [ HomeComponent, BlogComponent, BlogsComponent, ProjectComponent, ScrollToComponent ],
	providers: [ HomeGuard, BlogGuard, BlogsGuard, ProjectGuard ]
})
export class HomeModule { }
