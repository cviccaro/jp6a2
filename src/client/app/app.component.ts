import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay } from 'angular2-modal';

import { TitleService } from './shared/core/services/title.service';
import { JpImageZoomer } from './shared/core/components/image-zoom/image-zoomer';
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
	constructor(overlay: Overlay, vcRef: ViewContainerRef, router: Router, title: TitleService, imageZoomer: JpImageZoomer) {
		//PageScrollConfig.defaultScrollOffset = 160;
		PageScrollConfig.defaultDuration = 1000;

		overlay.defaultViewContainer = vcRef;
		imageZoomer.defaultViewContainer = vcRef;

		router.events.subscribe((evt: any) => {
			if (evt.toString().match(/^RoutesRecognized/)) {
				//const data: any = evt.state.root.children[0].data;
				if (evt.state.url === '/home') {
					title.setTitle('Home');
				}
			}
		});
	}
}
