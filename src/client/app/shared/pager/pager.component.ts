import {Component, Input, Output, EventEmitter} from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

@Component({
	selector: 'jp-pager',
	moduleId: module.id,
	templateUrl: './pager.component.html',
	styleUrls: ['./pager.component.css'],
	//directives: [ MD_BUTTON_DIRECTIVES, MD_ICON_DIRECTIVES ]
})
export class PagerComponent {
	@Input() currentPage: number;
	@Input() pagerType: string;
	@Input() includeNav: any = false;
	@Input() totalPages: number;

	@Output() pageChanged = new EventEmitter();

	getRange(num: number) {
		return new Array(num);
	}

	getResults(num: number) {
		this.pageChanged.emit(num);
	}
}
