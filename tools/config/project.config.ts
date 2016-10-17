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

  constructor() {
    super();

    this.APP_TITLE = 'JP Enterprises';

    this.ENABLE_SCSS = true;

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      { src: 'jquery/dist/jquery.min.js', inject: 'libs' },
      { src: 'dynamics.js/lib/dynamics.min.js', inject: 'libs' },
      { src: '@angular/material/core/overlay/overlay.css', inject: true, vendor: false }
     // { src: 'hammerjs/hammer.min.js', inject: 'libs' }
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS
    ];

    /* Add to or override NPM module configurations: */
    this.mergeObject(this.PLUGIN_CONFIGS['gulp-sass'], {
      includePaths: [
        './node_modules/',
        './resources/scss/',
        `./${this.APP_SRC}/app/`
      ]
    });

    this.SYSTEM_BUILDER_CONFIG.packageConfigPaths.push(
      join(this.PROJECT_ROOT, 'node_modules', '@angular', 'material', '*', 'package.json')
    );

    this.SYSTEM_CONFIG_DEV.paths['angular2-google-maps/core'] = 'node_modules/angular2-google-maps/core/core.umd.js';
    this.SYSTEM_BUILDER_CONFIG.paths['angular2-google-maps/core'] = 'node_modules/angular2-google-maps/core/core.umd.js';

    const bootstrapModalBundle = 'node_modules/angular2-modal/bundles/angular2-modal.bootstrap.umd.js';

    this.SYSTEM_CONFIG_DEV.paths['angular2-modal/plugins/bootstrap'] = bootstrapModalBundle;
    this.SYSTEM_BUILDER_CONFIG.paths['angular2-modal/plugins/bootstrap'] = bootstrapModalBundle;

    let that = this;
    function addToPackages(name: string, config: any) {
      that.SYSTEM_CONFIG_DEV.packages[name] = config;
      that.SYSTEM_BUILDER_CONFIG.packages[name] = config;
    }

    addToPackages('hammerjs', {
      main: 'hammer.min.js',
      defaultExtension: 'js'
    });

    addToPackages('ng2-recaptcha', {
      main: 'ng2-recaptcha.js',
      defaultExtension: 'js'
    });

    addToPackages('moment', {
      main: 'min/moment-with-locales.min.js',
      defaultExtension: 'js'
    });

    addToPackages('angular2-moment', {
      main: 'index.js',
      defaultExtension: 'js'
    });

    addToPackages('angular2-modal', {
      main: 'bundles/angular2-modal.umd.js',
      defaultExtension: 'js'
    });

    addToPackages('@angular/material', {
      format: 'cjs',
      main: 'material.umd.js',
    });

    addToPackages('angular2-google-maps/core', {
      defaultExtension: 'js',
      main: 'core.umd.js'
    });


    switch(this.ENV) {
      case 'dev':
        this.CONF = DevConfig;
        break;
      case 'prod':
        this.CONF = ProdConfig;
        break;
    }
  }

}
