/**
 * This barrel file provides the exports for the shared resources (services, components).
 */
export * from './name-list/index';
export * from './navbar/index';
export * from './toolbar/index';
export * from './config/index';
export * from './cache/index';
export * from './splash/index';
export * from './logo/index';
export * from './icon-button/index';
export * from './work/index';
export * from './card/index';
export * from './staff/index';
export * from './background/index';
export * from './glass-square/index';
export * from './blog/index';
export * from './post/index';
export * from './pipes/index';
export * from './models/index';
export * from './social-icons/index';

import {BlogService} from './blog/blog.service';
import {ConfigService} from './config/config.service';
import {CacheService} from './cache/cache.service';
import {StaffService} from './staff/staff.service';
import {WorkService} from './work/work.service';

export const APP_SERVICES = [
  BlogService,
  ConfigService,
  CacheService,
  WorkService,
  StaffService
];
