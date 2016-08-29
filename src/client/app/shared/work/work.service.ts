import {URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import { Config } from '../index';
import { ApiHttp } from '../xhr/xhr.http';
import { XhrService } from '../xhr/xhr.service';

@Injectable()
export class WorkService {

	constructor(public http: ApiHttp, public xhr: XhrService) { }

	public recent(skip:number = 0, take:number = 3) {
		let params = new URLSearchParams();

		params.set('skip', skip.toString());
		params.set('take', take.toString());

    return this.http.get(Config.API + '/projects/recent', {search: params})
        .map(res => res.json());
	}

	public find(uri: string) {
		return this.http.get(Config.API + '/projects/uri/' + uri)
			.map(res => res.json());
	}
}
