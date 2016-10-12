import { join } from 'path';

import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

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
      ...this.APP_ASSETS,
      { src: `${this.CSS_SRC}/theme.css`, inject: true, vendor: false },
      { src: `${this.CSS_SRC}/mobile.css`, inject: true, vendor: false },
      { src: `${this.CSS_SRC}/animations.css`, inject: true, vendor: false }
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    /* Add to or override NPM module configurations: */
    this.mergeObject(this.PLUGIN_CONFIGS['gulp-sass'], {
      includePaths: [
        './node_modules/',
        './resources/scss/'
      ]
    });


    this.SYSTEM_CONFIG_DEV.packageConfigPaths.push('/node_modules/@angular/material/*/package.json');
    this.SYSTEM_BUILDER_CONFIG.packageConfigPaths.push(
      join(this.PROJECT_ROOT, 'node_modules', '@angular', 'material', '*', 'package.json')
    );

    this.SYSTEM_CONFIG_DEV.paths['angular2-google-maps/core'] = 'node_modules/angular2-google-maps/core/core.umd.js';
    this.SYSTEM_BUILDER_CONFIG.paths['angular2-google-maps/core'] = 'node_modules/angular2-google-maps/core/core.umd.js';

    const bootstrapModalBundle = 'node_modules/angular2-modal/bundles/angular2-modal.bootstrap.umd.js';

    this.SYSTEM_CONFIG_DEV.paths['angular2-modal/plugins/bootstrap'] = bootstrapModalBundle;
    this.SYSTEM_BUILDER_CONFIG.paths['angular2-modal/plugins/bootstrap'] = bootstrapModalBundle;

    this.SYSTEM_BUILDER_CONFIG.packages['hammerjs'] = {
      main: 'hammer.min.js',
      defaultExtension: 'js'
    };

    this.SYSTEM_BUILDER_CONFIG.packages['ng2-recaptcha'] = {
      main: 'ng2-recaptcha.js',
      defaultExtension: 'js'
    };

    this.SYSTEM_BUILDER_CONFIG.packages['moment'] = {
      main: 'min/moment-with-locales.min.js',
      defaultExtension: 'js'
    };

    this.SYSTEM_BUILDER_CONFIG.packages['angular2-moment'] = {
      main: 'index.js',
      defaultExtension: 'js'
    };

    this.SYSTEM_BUILDER_CONFIG.packages['angular2-modal'] = {
      main: 'bundles/angular2-modal.umd',
      defaultExtension: 'js'
    };

    // this.SYSTEM_BUILDER_CONFIG.packages['angular2-modal/plugins/bootstrap'] = {
    //   main: 'angular2-modal.bootstrap.js',
    //   defaultExtension: 'js'
    // };

    this.SYSTEM_BUILDER_CONFIG.packages['@angular/material'] = {
      format: 'cjs',
      main: 'material.umd.js',
    };

    this.SYSTEM_BUILDER_CONFIG.packages['angular2-google-maps/core'] = {
      defaultExtension: 'js',
      main: 'core.umd.js'
    };
  }

}
