import { RouterConfig } from '@angular/router';

import { HomeComponent } from './index';
import {ConfigGuard} from '../shared/config/config.guard';

export const HomeRoutes: RouterConfig = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ ConfigGuard ]
  },
];
