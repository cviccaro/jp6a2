import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './+home/home.module';

import { AppComponent } from './app.component';
import { ConfigGuard } from './shared/index';
import { routes } from './app.routes';
import { Config } from './shared/config/env.config';
import { provideLazyMapsAPILoaderConfig, AgmCoreModule } from 'angular2-google-maps/core';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap/index';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(routes),
		HomeModule,
		AgmCoreModule.forRoot(),
		SharedModule.forRoot(),
		ModalModule.forRoot(),
		BootstrapModalModule
	],
	declarations: [ AppComponent ],
	bootstrap: [ AppComponent ],
	providers: [
		{
	  	provide: APP_BASE_HREF,
	  	useValue: '<%= APP_BASE %>'
		},
		provideLazyMapsAPILoaderConfig({apiKey: Config.GoogleMapsAPIKey}),
		ConfigGuard,
		Title
	]
})
export class AppModule { }
