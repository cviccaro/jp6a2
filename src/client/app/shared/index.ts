/**
 * This barrel file provides the exports for the shared resources (services, components).
 */
export * from './background/index';
export * from './blog/index';
export * from './cache/index';
export * from './card/index';
export * from './client/index';
export * from './content-overlay/index';
export * from './config/index';
export * from './gallery/index';
export * from './glass-square/index';
export * from './hover-dynamics/index';
export * from './icon-button/index';
export * from './logo/index';
export * from './map/index';
export * from './models/index';
export * from './navbar/index';
export * from './pager/index';
export * from './pipes/index';
export * from './post/index';
export * from './scroll/index';
export * from './social-icons/index';
export * from './splash/index';
export * from './staff/index';
export * from './textarea-autoexpand/index';
export * from './validators/index';
export * from './work/index';

import {BlogService} from './blog/blog.service';
import {CacheService} from './cache/cache.service';
import {ClientService} from './client/client.service';
import {ConfigService} from './config/config.service';
import {NavbarService} from './navbar/navbar.service';
import {ScrollService} from './scroll/scroll.service';
import {StaffService} from './staff/staff.service';
import {WorkService} from './work/work.service';

export const APP_SERVICES = [
  BlogService,
  ConfigService,
  CacheService,
  WorkService,
  StaffService,
  ClientService,
  ScrollService,
  NavbarService
];
