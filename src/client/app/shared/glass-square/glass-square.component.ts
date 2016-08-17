import {Component, Input} from '@angular/core';

@Component({
	selector: 'jp-glass-square',
	moduleId: module.id,
	template: '<img [src]="imgUrl" [title]="imgTitle" [alt]="imgTitle" />',
	styleUrls: ['./glass-square.component.css']
})
export class GlassSquareComponent {
	@Input() imgUrl: string;
	@Input() imgTitle: string;
}
