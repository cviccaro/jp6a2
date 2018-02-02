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
  OUTPUT_FOLDER = 'public';
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  SHARED_MODULE_SRC = 'app/shared';
  TYPEKIT_ID: string;

  constructor() {
    super();

    this.setConfig();

    this.APP_TITLE = this.CFG.siteTitle;
    this.ENABLE_SCSS = true;
    this.TYPEKIT_ID = 'wqu6orw';
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      { src: 'dynamics.js/lib/dynamics.min.js', inject: 'libs' },
      { src: 'hammerjs/hammer.min.js', inject: 'libs' }
      // { src: '@angular/material/core/overlay/overlay.css', inject: true, vendor: false }
     // { src: 'hammerjs/hammer.min.js', inject: 'libs' }
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      { src: `${this.APP_SRC}/${this.SHARED_MODULE_SRC}/core/styles/modernizr.js`, inject: true }
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

    const map = {
       'angular2-moment': 'node_modules/angular2-moment/',
       'angular2-recaptcha': 'node_modules/angular2-recaptcha/',
       'ng-inline-svg': 'node_modules/ng-inline-svg/'
    };

    const additionalPackages: ExtendPackages[] = [
    {
      name: 'hammerjs',
      path: 'node_modules/hammerjs/hammer.min.js'
    },
    {
      name: 'angular2-recaptcha',
      packageMeta: {
        main: 'index',
        defaultExtension: 'js'
      }
    },
    {
      name: 'moment',
      path: 'node_modules/moment/min/moment-with-locales.min.js'
    },
    {
      name: 'angular2-moment',
      packageMeta: {
        main: 'index',
        defaultExtension: 'js'
      }
    },
    {
      name: 'ngx-modialog',
      path: 'node_modules/ngx-modialog/bundle/ngx-modialog.umd.min.js'
    },
    {
      name: 'angular2-modal/plugins/bootstrap',
      path: 'node_modules/angular2-modal/plugins/bootstrap/bundle/angular2-modal-bootstrap.rollup.umd.min.js'
    },
    {
      name: 'ng2-dnd',
      path: 'node_modules/ng2-dnd/bundles/index.umd.js'
    },
    {
      name: '@angular/cdk',
      path: 'node_modules/@angular/cdk/bundles/cdk.umd.js'
    },
    {
      name: '@angular/cdk/a11y',
      path: 'node_modules/@angular/cdk/bundles/cdk-a11y.umd.js'
    },
    {
      name: '@angular/cdk/accordion',
      path: 'node_modules/@angular/cdk/bundles/cdk-accordion.umd.js'
    },
    {
      name: '@angular/cdk/bidi',
      path: 'node_modules/@angular/cdk/bundles/cdk-bidi.umd.js'
    },
    {
      name: '@angular/cdk/coercion',
      path: 'node_modules/@angular/cdk/bundles/cdk-coercion.umd.js'
    },
    {
      name: '@angular/cdk/collections',
      path: 'node_modules/@angular/cdk/bundles/cdk-collections.umd.js'
    },
    {
      name: '@angular/cdk/layout',
      path: 'node_modules/@angular/cdk/bundles/cdk-layout.umd.js'
    },
    {
      name: '@angular/cdk/keycodes',
      path: 'node_modules/@angular/cdk/bundles/cdk-keycodes.umd.js'
    },
    {
      name: '@angular/cdk/observers',
      path: 'node_modules/@angular/cdk/bundles/cdk-observers.umd.js'
    },
    {
      name: '@angular/cdk/overlay',
      path: 'node_modules/@angular/cdk/bundles/cdk-overlay.umd.js'
    },
    {
      name: '@angular/cdk/platform',
      path: 'node_modules/@angular/cdk/bundles/cdk-platform.umd.js'
    },
    {
      name: '@angular/cdk/portal',
      path: 'node_modules/@angular/cdk/bundles/cdk-portal.umd.js'
    },
    {
      name: '@angular/cdk/rxjs',
      path: 'node_modules/@angular/cdk/bundles/cdk-rxjs.umd.js'
    },
    {
      name: '@angular/cdk/scrolling',
      path: 'node_modules/@angular/cdk/bundles/cdk-scrolling.umd.js'
    },
    {
      name: '@angular/cdk/stepper',
      path: 'node_modules/@angular/cdk/bundles/cdk-stepper.umd.js'
    },
    {
      name: '@angular/cdk/table',
      path: 'node_modules/@angular/cdk/bundles/cdk-table.umd.js'
    },
    {
      name: '@angular/material',
      path: 'node_modules/@angular/material/bundles/material.umd.js'
    },
    {
      name: '@angular/material/button',
      path: 'node_modules/@angular/material/bundles/material-button.umd.js'
    },
    {
      name: '@angular/material/common',
      path: 'node_modules/@angular/material/bundles/material-common.umd.js'
    },
    {
      name: '@angular/material/core',
      path: 'node_modules/@angular/material/bundles/material-core.umd.js'
    },
    {
      name: '@angular/material/icon',
      path: 'node_modules/@angular/material/bundles/material-icon.umd.js'
    },
    {
      name: '@angular/material/input',
      path: 'node_modules/@angular/material/bundles/material-input.umd.js'
    },
    {
      name: '@angular/material/form-field',
      path: 'node_modules/@angular/material/bundles/material-form-field.umd.js'
    },
    {
      name: '@angular/material/grid-list',
      path: 'node_modules/@angular/material/bundles/material-grid-list.umd.js'
    },
    {
      name: '@angular/material/progress-bar',
      path: 'node_modules/@angular/material/bundles/material-progress-bar.umd.js'
    },
    {
      name: '@angular/material/toolbar',
      path: 'node_modules/@angular/material/bundles/material-toolbar.umd.js'
    },
    {
      name: '@angular/material/tooltip',
      path: 'node_modules/@angular/material/bundles/material-tooltip.umd.js'
    },
    {
      name: '@agm/core',
      path: 'node_modules/@agm/core/core.umd.js',
    },
    {
      name: 'ng-inline-svg',
      //path: 'node_modules/ng-inline-svg/lib/index.js',
      packageMeta: {
        defaaultExtension: 'js',
        main: 'lib/index'
      }
    },
    {
      name: 'ng2-page-scroll',
      path: 'node_modules/ng2-page-scroll/bundles/ng2-page-scroll.umd.js'
    }];

    // this.SYSTEM_BUILDER_CONFIG.paths['@agm/core'] = 'node_modules/@agm/core/core.umd.js';
    //this.SYSTEM_CONFIG_DEV.paths['@agm/core'] = 'node_modules/@agm/core/core.umd.js';
    this.SYSTEM_BUILDER_CONFIG.packageConfigPaths.push('node_modules/@agm/*/package.json');

    this.addPackagesMap(map);
    this.addPackagesBundles(additionalPackages);

    /* Add proxy middleware */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')('/api', { ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
    
    console.log(this);
  }

  addPackagesMap(map: { [key: string]: string }) {
    if (this.SYSTEM_CONFIG_DEV.map === undefined) {
      this.SYSTEM_CONFIG_DEV.map = {};
    }
    if (this.SYSTEM_BUILDER_CONFIG.map === undefined) {
      this.SYSTEM_BUILDER_CONFIG.map = {};
    }
    for (const packageName in map) {
      this.SYSTEM_CONFIG_DEV.map[packageName] = map[packageName];
      this.SYSTEM_BUILDER_CONFIG.map[packageName] = map[packageName];
    }
  }

  setConfig() {
    const type = argv['env-config'] || 'dev';

    switch (type) {
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

	  this.GOOGLE_ANALYTICS_ID = this.CFG['GoogleAnalyticsAPIKey'] ? this.CFG['GoogleAnalyticsAPIKey'] : null;
  }

}
