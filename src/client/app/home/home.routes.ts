import { Route } from '@angular/router';

import { HomeComponent, ScrollToComponent } from './index';
import { BlogComponent } from './blog/index';
import { BlogsComponent } from './blogs/index';
import { ProjectComponent } from './project/index';
import { PrivacyComponent } from './privacy/index';
import { ConfigGuard } from '../shared/config/config.guard';
import { HomeGuard } from './home.guard';
import { BlogsGuard } from './blogs/blogs.guard';
import { BlogGuard } from './blog/blog.guard';
import { ProjectGuard } from './project/project.guard';

export const HomeRoutes: Route[] = [
	{
		path: '',
		canActivate: [ ConfigGuard, HomeGuard ],
		component: HomeComponent,
		children: [
			{ path: 'blogs', component: BlogsComponent, data: { returnTo: '/home' }, canActivate: [ BlogsGuard ] },
			{ path: 'blogs/:slug', component: BlogComponent, data: { returnTo: '/home'}, canActivate: [ BlogGuard ]},
			{ path: 'projects/:slug', component: ProjectComponent, data: { returnTo: '/home'}, canActivate: [ ProjectGuard ]},
			{ path: 'privacy', component: PrivacyComponent, data: { returnTo: '/home' } },
			{ path: ':selector', component: ScrollToComponent },
			{ path: '', component: ScrollToComponent }
		],
		data: {
			title: 'Home'
		}
	}
];
