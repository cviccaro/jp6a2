import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Overlay } from 'angular2-modal';

import { CacheService } from './shared/index';
import { PageScrollConfig } from 'ng2-page-scroll';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'jp-app',
  templateUrl: 'app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	constructor(overlay: Overlay, vcRef: ViewContainerRef, router: Router, title: Title, cache: CacheService) {
		//PageScrollConfig.defaultScrollOffset = 160;
		PageScrollConfig.defaultDuration = 1000;

		overlay.defaultViewContainer = vcRef;

		router.events.subscribe((evt: any) => {
			if (evt.toString().match(/^RoutesRecognized/)) {
				const data: any = evt.state.root.children[0].data;
				if (data.hasOwnProperty('title') && cache.has('config') && evt.state.root.children[0].children.length === 0) {
					const config: any = cache.get('config');
					const title_root = config.main_site_title;
					title.setTitle(`${title_root} | ${data['title']}`);
				}
			}
		});
	}
}
