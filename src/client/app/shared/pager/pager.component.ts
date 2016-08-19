import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'jp-pager',
	moduleId: module.id,
	templateUrl: './pager.component.html',
	styleUrls: ['./pager.component.css']
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
