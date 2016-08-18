import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

const GeolocationErrors = [
	'UnsupportedBrowser',
	'PermissionDenied',
	'PositionUnavailable',
	'Timeout'
];

@Injectable()
export class GeolocateService {
	locate(opts:Object = {}): Observable<any> {
		return Observable.create((observer: any) => {
			if (window.navigator && window.navigator.geolocation) {
				window.navigator.geolocation.getCurrentPosition(
					(position) => {
						observer.next(position);
						observer.complete(position);
					},
					(error) => {
						observer.error(GeolocationErrors[error.code]);
					},
					opts
				);
			} else {
				observer.error(GeolocationErrors[0]);
			}
		});
	}
}
