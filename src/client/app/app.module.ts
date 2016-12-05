import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ConfigGuard } from './shared/index';
import { routes } from './app.routes';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(routes),
		HomeModule,
		AgmCoreModule.forRoot({apiKey: 'AIzaSyD6OLSQawz3GV_l25DsiOkJprC_PRO57Rc'}),
		SharedModule.forRoot()
	],
	declarations: [ AppComponent ],
	bootstrap: [ AppComponent ],
	providers: [
		{
	  	provide: APP_BASE_HREF,
	  	useValue: '<%= APP_BASE %>'
		},
		ConfigGuard,
		Title
	]
})
export class AppModule { }
