import { Routes } from '@angular/router';

import { HomeRoutes } from './+home/index';

import { ConfigGuard } from './shared/index';
import {HomeGuard} from './+home/home.guard';

export const routes: Routes = [
  ...HomeRoutes
];
