import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeGuard } from './home.guard';

@NgModule({
	imports: [SharedModule,],
	declarations: [HomeComponent],
	exports: [HomeComponent],
	providers:  [HomeGuard]
})
export class HomeModule { }
