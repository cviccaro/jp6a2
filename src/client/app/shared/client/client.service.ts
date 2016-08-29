import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Config } from '../index';
import { ApiHttp } from '../xhr/xhr.http';

@Injectable()
export class ClientService {
	constructor(public http: ApiHttp) {}

	featured() {
		return this.http.get(Config.API + '/clients/featured')
			.map(res => res.json());
	}
}
