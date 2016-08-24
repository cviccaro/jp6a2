import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
	transform(v: string) {
		return v.substr(0, 1).toUpperCase() + v.substr(1, v.length - 1);
	}
}
