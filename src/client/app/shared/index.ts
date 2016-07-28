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

import {ConfigService} from './config/config.service';
import {CacheService} from './cache/cache.service';

export const APP_SERVICES = [
  ConfigService,
  CacheService
];
