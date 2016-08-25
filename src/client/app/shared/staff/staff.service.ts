import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import { Config } from '../index';
import 'rxjs/add/operator/map';

@Injectable()
export class StaffService {
	constructor(public http: Http) { }

	public all() {
        return this.http.get(Config.API + '/staff')
            .map((res) => res.json());
	}
}
