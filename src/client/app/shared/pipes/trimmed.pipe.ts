import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'trimmed'})
export class Trimmed implements PipeTransform {
    transform(value: any, wordwise: boolean, max: any, tail: number) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            let lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    }
}
