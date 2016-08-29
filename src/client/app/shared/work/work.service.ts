import {Http, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import { Config } from '../index';
import { XhrService } from '../xhr/xhr.service';

@Injectable()
export class WorkService {

	constructor(public http: Http, public xhr: XhrService) { }

	public recent(skip:number = 0, take:number = 3) {
		let params = new URLSearchParams();

		params.set('skip', skip.toString());
		params.set('take', take.toString());

		this.xhr.startTracking('workRecent');

    return this.http.get(Config.API + '/projects/recent', {search: params})
        .map(res => {
        	this.xhr.stopTracking('workRecent');
        	return res.json();
        });
	}

	public find(uri: string) {
		this.xhr.startTracking('workSingle');

		return this.http.get(Config.API + '/projects/uri/' + uri)
			.map(res => {
				this.xhr.stopTracking('workSingle');
				return res.json();
			});
	}
}
