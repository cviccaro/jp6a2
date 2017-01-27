import { join } from 'path';

import { SeedConfig } from './seed.config';

import * as DevConfig from '../env/dev';
import * as ProdConfig from '../env/prod';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  CONF: any;
  SHARED_MODULE_SRC = 'app/shared';
  OUTPUT_FOLDER = 'public';

  addToPackages: (name: string, config: any) => void;
  addToPaths: (name: string, config: any) => void;

  constructor() {
    super();

    this.addToPackages = (name: string, config: any) => {
      this.SYSTEM_CONFIG_DEV.packages[name] = config;
      this.SYSTEM_BUILDER_CONFIG.packages[name] = config;
    };
    this.addToPaths = (name: string, config: any) => {
      this.SYSTEM_CONFIG_DEV.paths[name] = config;
      this.SYSTEM_BUILDER_CONFIG.packages[name] = config;
    };

    this.APP_TITLE = 'JP Enterprises';

    this.ENABLE_SCSS = true;

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      { src: 'jquery/dist/jquery.min.js', inject: 'libs' },
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

    /* Add to or override NPM module configurations: */
    this.mergeObject(this.PLUGIN_CONFIGS['gulp-sass'], {
      includePaths: [
        './node_modules/',
        `./${this.APP_SRC}/app/shared/_scss/includes/`,
        `./${this.APP_SRC}/app/`
      ]
    });

    this.addToPaths('angular2-modal/plugins/bootstrap', 'node_modules/angular2-modal/bundles/angular2-modal.bootstrap.umd.js');

    this.addToPackages('hammerjs', {
      main: 'hammer.min.js',
      defaultExtension: 'js'
    });

    this.addToPackages('ng2-recaptcha', {
      main: 'ng2-recaptcha.js',
      defaultExtension: 'js'
    });

    this.addToPackages('moment', {
      main: 'min/moment-with-locales.min.js',
      defaultExtension: 'js'
    });

    this.addToPackages('angular2-moment', {
      main: 'index.js',
      defaultExtension: 'js'
    });

    this.addToPackages('angular2-modal', {
      main: 'bundles/angular2-modal.umd.js',
      defaultExtension: 'js'
    });

    this.addToPackages('@angular/material', {
      format: 'cjs',
      main: 'bundles/material.umd.js',
    });

    this.addToPackages('angular2-google-maps/core', {
      defaultExtension: 'js',
      main: 'index.js'
    });

    this.addToPackages('ng-inline-svg', {
      defaultExtension: 'js',
      main: 'lib/index.js'
    });

    switch(this.BUILD_TYPE) {
      case 'dev':
        this.CONF = DevConfig;
        break;
      case 'prod':
        this.CONF = ProdConfig;
        break;
    }
  }

}
