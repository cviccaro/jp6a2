import { Routes } from '@angular/router';
import { HomeRoutes } from './home/home.routes';
import { TestRoutes } from './test/test.routes';

export const routes: Routes = [
	...TestRoutes,
  ...HomeRoutes
];
