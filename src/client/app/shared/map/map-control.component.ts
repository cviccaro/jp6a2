import {Component, Output, EventEmitter} from '@angular/core';
import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core';

@Component({
	selector: 'jp-map-control',
	template: ''
})
export class MapControlComponent {
	@Output() mapLoaded = new EventEmitter();

	constructor(private _wrapper: GoogleMapsAPIWrapper) {
		this._wrapper.getNativeMap().then((m) => {
			this.mapLoaded.emit(m);
		}).catch((e) => {
			console.log('Error getting map: ', e);
		});
	}
}
