import { RouterConfig } from '@angular/router';

import { HomeComponent, DummyComponent } from './index';
import { BlogsComponent } from './blogs/index';

import {ConfigGuard} from '../shared/config/config.guard';

export const HomeRoutes: RouterConfig = [
	{
		path: '',
		canActivate: [ ConfigGuard ],
		component: HomeComponent,
		children: [
			{ path: 'blogs', component: BlogsComponent, terminal: true, data: { returnTo: '/home' } },
			{ path: ':selector', component: DummyComponent, terminal: true }
		]
	}
];
