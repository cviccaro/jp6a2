import { Route, RouterModule } from '@angular/router';

import { TestComponent } from './test.component';

export const TestRoutes: Route[] = [
	{
		path: 'test',
		loadChildren: './app/test/test.module#TestModule'
	}
];

export const TestLazyRoutes = RouterModule.forChild([
	{
		path: '',
		component: TestComponent,
		pathMatch: 'full'
	}
]);
