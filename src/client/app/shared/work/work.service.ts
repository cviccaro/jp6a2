import {Http, URLSearchParams} from '@angular/http';
import { Config } from '../index';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class WorkService {

	constructor(public http: Http) { }

	public recent(skip:number = 0, take:number = 3) {
		let params = new URLSearchParams();
		params.set('skip', skip.toString());
		params.set('take', take.toString());

        return this.http.get(Config.API + '/projects/recent', {search: params})
            .map((res) => res.json());
	}
}
