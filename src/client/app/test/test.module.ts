import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
//import { TestLazyRoutes } from './test.routes';
import { TestComponent } from './test.component';

@NgModule({
	imports: [
		SharedModule,
		//TestLazyRoutes
	],
	declarations: [
		TestComponent
	],
	exports: [ TestComponent ]
})
export class TestModule { }
