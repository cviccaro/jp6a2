import { join } from 'path';
import { argv } from 'yargs';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

import * as DevConfig from '../env/dev';
import * as StagingConfig from '../env/staging';
import * as ProdConfig from '../env/prod';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {
  CFG: any;
  NF: any;
  OUTPUT_FOLDER = 'public';
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  SHARED_MODULE_SRC = 'app/shared';
  TYPEKIT_ID: string;

  constructor() {
    super();

    this.setConfig();

    this.APP_TITLE = 'Advertising & Digital Marketing Agency | JP Enterprises';
    this.ENABLE_SCSS = true;
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      { src: 'dynamics.js/lib/dynamics.min.js', inject: 'libs' },
      // { src: '@angular/material/core/overlay/overlay.css', inject: true, vendor: false }
     // { src: 'hammerjs/hammer.min.js', inject: 'libs' }
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      { src: `${this.APP_SRC}/${this.SHARED_MODULE_SRC}/_scss/modernizr.js`, inject: true }
    ];

    this.ROLLUP_INCLUDE_DIR = [
      ...this.ROLLUP_INCLUDE_DIR,
      //'node_modules/moment/**'
    ];

    this.ROLLUP_NAMED_EXPORTS = [
      ...this.ROLLUP_NAMED_EXPORTS,
      //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
    ];

    /* Add to or override NPM module configurations: */
    this.PLUGIN_CONFIGS['gulp-sass'] = {
      includePaths: [
        './node_modules/',
        `./${this.APP_SRC}/app/shared/core/styles/includes/`,
        `./${this.APP_SRC}/app/`
      ]
    };

    let additionalPackages: ExtendPackages[] = [{
      name: 'hammerjs',
      path: 'node_modules/hammerjs/hammer.min.js'
    },
    {
      name: 'angular2-recaptcha',
      path: 'node_modules/angular2-recaptcha/index.js'
    },
    {
      name: 'moment',
      path: 'node_modules/moment/min/moment-with-locales.min.js'
    },
    {
      name: 'angular2-moment',
      path: 'node_modules/angular2-moment/index.js'
    },
    {
      name: 'angular2-modal',
      path: 'node_modules/angular2-modal/bundles/angular2-modal.umd.js'
    },
    {
      name: 'angular2-modal/plugins/bootstrap',
      path: 'node_modules/angular2-modal/bundles/angular2-modal.bootstrap.umd.js'
    },
    {
      name: 'ng2-dnd',
      path: 'node_modules/ng2-dnd/bundles/index.umd.js'
    },
    {
      name: '@angular/material',
      path: 'node_modules/@angular/material/bundles/material.umd.js'
    },
    {
      name: '@agm/core',
      path: 'node_modules/@agm/core/index.js'
    },
    // {
    //   name: 'ng-inline-svg',
    //   path: 'node_modules/ng-inline-svg/lib/index.js'
    // },
    {
      name: 'ng2-page-scroll',
      path: 'node_modules/ng2-page-scroll/bundles/ng2-page-scroll.umd.min.js'
    }];

    this.addPackagesBundles(additionalPackages);

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')('/api', { ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

  setConfig() {
    let type = (argv['build-type'] || argv['env'] || '').toLowerCase();

    switch(type) {
      case 'dev':
        this.CFG = DevConfig;
        break;
      case 'staging':
        this.CFG = StagingConfig;
        break;
        case 'prod':
          this.CFG = ProdConfig;
        break;
    }
  }
}
