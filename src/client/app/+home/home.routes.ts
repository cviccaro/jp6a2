import { Route } from '@angular/router';

import { HomeComponent, ScrollToComponent } from './index';

import { BlogComponent } from './blog/index';
import { BlogsComponent } from './blogs/index';
import { ProjectComponent } from './project/index';

import {ConfigGuard} from '../shared/config/config.guard';
import {HomeGuard} from './home.guard';
import {BlogGuard} from './blog/blog.guard';
import {ProjectGuard} from './project/project.guard';

export const HomeRoutes: Route[] = [
	{
		path: '',
		canActivate: [ ConfigGuard, HomeGuard ],
		component: HomeComponent,
		children: [
			{ path: 'blogs', component: BlogsComponent, terminal: true, data: { returnTo: '/home' } },
			{ path: 'blogs/:slug', component: BlogComponent, terminal: true, data: { returnTo: '/home'}, canActivate: [ BlogGuard ]},
			{ path: 'projects/:slug', component: ProjectComponent, terminal: true, data: { returnTo: '/home'}, canActivate: [ ProjectGuard ]},
			{ path: ':selector', component: ScrollToComponent, terminal: true },
			{ path: '', component: ScrollToComponent, terminal: true }
		]
	}
];
