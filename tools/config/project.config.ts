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
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      { src: `${this.CSS_SRC}/mobile.${this.getInjectableStyleExtension()}`, inject: true, vendor: false }
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });

    this.SYSTEM_CONFIG_DEV.packageConfigPaths.push('/node_modules/@angular2-material/*/package.json');
    this.SYSTEM_BUILDER_CONFIG.packageConfigPaths.push(join(this.PROJECT_ROOT, 'node_modules', '@angular2-material', '*', 'package.json'));

    this.SYSTEM_BUILDER_CONFIG.packages['moment'] = {
      main: 'min/moment-with-locales.min.js',
      defaultExtension: 'js'
    };

    this.SYSTEM_BUILDER_CONFIG.packages['angular2-moment'] = {
      main: 'index.js',
      defaultExtension: 'js'
    };

    this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/core'] = {
      main: 'core.js',
      defaultExtension: 'js'
    };
    this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/button'] = {
      main: 'button.js',
      defaultExtension: 'js'
    };
    // this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/button-toggle'] = {
    //   main: 'button-toggle.js',
    //   defaultExtension: 'js'
    // };
    // this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/card'] = {
    //   main: 'card.js',
    //   defaultExtension: 'js'
    // };
    // this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/checkbox'] = {
    //   main: 'checkbox.js',
    //   defaultExtension: 'js'
    // };
    this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/grid-list'] = {
      main: 'grid-list.js',
      defaultExtension: 'js'
    };
    this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/icon'] = {
      main: 'icon.js',
      defaultExtension: 'js'
    };
    this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/input'] = {
      main: 'input.js',
      defaultExtension: 'js'
    };
    // this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/list'] = {
    //    main: 'list.js',
    //    defaultExtension: 'js'
    // };
    // this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/menu'] = {
    //   main: 'menu.js',
    //   defaultExtension: 'js'
    // };
    // this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/progress-bar'] = {
    //   main: 'progress-bar.js',
    //   defaultExtension: 'js'
    // };
    // this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/progress-circle'] = {
    //   main: 'progress-circle.js',
    //   defaultExtension: 'js'
    // };
    // this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/radio'] = {
    //   main: 'radio.js',
    //   defaultExtension: 'js'
    // };
    // this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/sidenav'] = {
    //   main: 'sidenav.js',
    //   defaultExtension: 'js'
    // };
    // this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/slider'] = {
    //   main: 'slider.js',
    //   defaultExtension: 'js'
    // };
    // this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/slide-toggle'] = {
    //   main: 'slide-toggle.js',
    //   defaultExtension: 'js'
    // };
    // this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/tabs'] = {
    //   main: 'tabs.js',
    //   defaultExtension: 'js'
    // };
    this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/toolbar'] = {
      main: 'toolbar.js',
      defaultExtension: 'js'
    };
    // this.SYSTEM_BUILDER_CONFIG.packages['@angular2-material/tooltip'] = {
    //   main: 'tooltip.js',
    //   defaultExtension: 'js'
    // };

    this.SYSTEM_BUILDER_CONFIG.packages['angular2-google-maps/core'] = {
      defaultExtension: 'js',
      main: 'core.umd.js'
    };

    this.SYSTEM_CONFIG_DEV.paths['angular2-google-maps/core'] = 'node_modules/angular2-google-maps/core/core.umd.js';
    this.SYSTEM_BUILDER_CONFIG.paths['angular2-google-maps/core'] = 'node_modules/angular2-google-maps/core/core.umd.js';
  }

}
