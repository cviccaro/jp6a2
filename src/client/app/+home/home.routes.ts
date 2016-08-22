import { RouterConfig } from '@angular/router';

import { HomeComponent, ScrollToComponent } from './index';
import { BlogsComponent } from './blogs/index';

import {ConfigGuard} from '../shared/config/config.guard';
import {HomeGuard} from './home.guard';

export const HomeRoutes: RouterConfig = [
	{
		path: '',
		canActivate: [ ConfigGuard, HomeGuard ],
		component: HomeComponent,
		children: [
			{ path: 'blogs', component: BlogsComponent, terminal: true, data: { returnTo: '/home' } },
			{ path: ':selector', component: ScrollToComponent, terminal: true },
			{ path: '', component: ScrollToComponent, terminal: true }
		]
	}
];
