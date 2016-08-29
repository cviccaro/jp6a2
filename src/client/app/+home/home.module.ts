import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ToasterContainerComponent, ToasterService } from 'angular2-toaster/angular2-toaster';
import { HomeComponent } from './home.component';
import { ScrollToComponent } from './scroll-to.component';
import { BlogComponent } from './blog/blog.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ProjectComponent } from './project/project.component';
// import { DateFormatPipe } from 'angular2-moment';
// import { CapitalizePipe } from '../shared/index';
import { HomeGuard } from './home.guard';
import { BlogGuard } from './blog/blog.guard';
import { ProjectGuard } from './project/project.guard';

import { MomentModule } from 'angular2-moment';
import { MdCoreModule }from '@angular2-material/core';
import { MdButtonModule }from '@angular2-material/button';
import { MdIconModule }from '@angular2-material/icon';
import { MdInputModule }from '@angular2-material/input';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdToolbarModule } from '@angular2-material/toolbar';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RouterModule,
		ReactiveFormsModule,
		MdCoreModule,
		MdButtonModule,
		MdGridListModule,
		MdIconModule,
		MdInputModule,
		MdToolbarModule,
		MomentModule,
	],
	declarations: [
		HomeComponent,
		BlogComponent,
		BlogsComponent,
		ContactFormComponent,
		ProjectComponent,
		ScrollToComponent,
		ToasterContainerComponent
	],
	exports: [ HomeComponent, BlogComponent, BlogsComponent, ContactFormComponent, ProjectComponent, ScrollToComponent ],
	providers: [ HomeGuard, BlogGuard, ProjectGuard, ToasterService ]
})
export class HomeModule { }
