import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../index';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {
	constructor(public http: Http) {}

	featured() {
		return this.http.get(Config.API + '/clients/featured')
			.map(res => res.json());
	}
}
