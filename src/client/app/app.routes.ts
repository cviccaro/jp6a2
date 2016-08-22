import { provideRouter, RouterConfig } from '@angular/router';

import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';

import { ConfigGuard } from './shared/index';
import {HomeGuard} from "./+home/home.guard";

const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  ConfigGuard,
  HomeGuard
];
