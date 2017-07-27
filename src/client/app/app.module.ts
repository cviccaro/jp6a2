import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule, Title } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { TestModule } from './test/test.module';
import { SharedModule } from './shared/shared.module';
import { ConfigGuard } from './shared/core/config/config.guard';

const AppBaseProvider = {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>' };

@NgModule({
	imports: [BrowserModule, BrowserAnimationsModule, HttpModule, AppRoutingModule, HomeModule, TestModule, SharedModule.forRoot()],
	declarations: [ AppComponent ],
	providers: [AppBaseProvider, ConfigGuard, Title	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
