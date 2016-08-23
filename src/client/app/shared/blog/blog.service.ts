import {Http, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { Config } from '../index';

@Injectable()
export class BlogService {
	constructor(public http: Http) { }

	all(skip:number = 0) {
		let params = new URLSearchParams();
		params.set('skip', skip.toString());

	    return this.http.get(Config.API + '/blogs', {search: params})
	        .map((res) => res.json());
	}

	find(uri: string) {
		return this.http.get(Config.API + '/blogs/uri/' + uri)
			.map((res) => res.json());
	}

	related(id: number, max: number = 3) {
		let params = new URLSearchParams();
		params.set('max', max.toString());

		return this.http.get(Config.API + '/blogs/related/' + id, { search: params })
			.map((res) => res.json());
	}

	recent(skip: number = 0, take:number = 3, site_name?: string) {
		let params = new URLSearchParams();

		params.set('skip', skip.toString());
		params.set('take', take.toString());

		if (site_name) {
			params.set('division', site_name);
		}

		return this.http.get(Config.API + '/blogs/recent', { search: params })
			.map((res) => res.json());
	}
}
