import { Component, ViewContainerRef } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {MdIconRegistry} from '@angular2-material/icon';
import { Overlay } from 'angular2-modal';
/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'jp-app',
  viewProviders: [HTTP_PROVIDERS, MdIconRegistry],
  templateUrl: 'app.component.html'
})
export class AppComponent {
	constructor(overlay: Overlay, vcRef: ViewContainerRef) {
		overlay.defaultViewContainer = vcRef;
	}
}
