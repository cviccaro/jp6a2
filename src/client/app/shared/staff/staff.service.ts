import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Config } from '../index';
import { ApiHttp } from '../xhr/xhr.http';

@Injectable()
export class StaffService {
	constructor(public http: ApiHttp) { }

	public all() {
        return this.http.get(Config.API + '/staff/active')
            .map((res) => res.json());
	}
}
