import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeGuard } from './home.guard';

import { HomeRoutingModule } from './home-routing.module';

@NgModule({
	imports: [HomeRoutingModule, SharedModule,],
	declarations: [HomeComponent],
	exports: [HomeComponent],
	providers:  [HomeGuard]
})
export class HomeModule { }
