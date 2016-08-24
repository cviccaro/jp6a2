import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './+home/home.module';

import { AppComponent } from './app.component';
import { ConfigGuard } from './shared/index';
import { routes } from './app.routes';

@NgModule({
	imports: [ BrowserModule, HttpModule, RouterModule.forRoot(routes), HomeModule, SharedModule.forRoot()],
	declarations: [ AppComponent ],
	bootstrap: [ AppComponent ],
	providers: [
		{
	  	provide: APP_BASE_HREF,
	  	useValue: '<%= APP_BASE %>'
		},
		ConfigGuard
	]
})
export class AppModule { }
