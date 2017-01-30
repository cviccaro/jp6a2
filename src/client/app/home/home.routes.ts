import { Route } from '@angular/router';

import { HomeComponent } from './home.component';
import { ConfigGuard } from '../shared/config/config.guard';
import { HomeGuard } from './home.guard';

import {
	BlogComponent,
	BlogGuard,
	BlogsComponent,
	BlogsGuard,
	PrivacyComponent,
	ProjectComponent,
	ProjectGuard,
	ScrollToComponent,
	SubscribeComponent
} from '../shared/index';

export const HomeRoutes: Route[] = [
	{
		path: '',
		canActivate: [ ConfigGuard, HomeGuard ],
		component: HomeComponent,
		children: [
			{ path: 'blogs', component: BlogsComponent, data: { returnTo: '/home' }, canActivate: [ BlogsGuard ] },
			{ path: 'blogs/:slug', component: BlogComponent, data: { returnTo: '/home'}, canActivate: [ BlogGuard ]},
			{ path: 'work/:slug', component: ProjectComponent, data: { returnTo: '/home'}, canActivate: [ ProjectGuard ]},
			{ path: 'privacy', component: PrivacyComponent, data: { returnTo: '/home', title: 'Privacy Policy' } },
			{ path: 'subscribe', component: SubscribeComponent, data: { returnTo: '/home', title: 'Subscribe' } },
			{ path: ':selector', component: ScrollToComponent },
			{ path: '', component: ScrollToComponent }
		],
		data: {
			title: 'Home'
		}
	}
];
