import {Http, URLSearchParams} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { Config } from '../index';
import { XhrService } from '../xhr/xhr.service';

@Injectable()
export class BlogService {
	constructor(public http: Http, public xhr: XhrService) { }

	all(skip:number = 0) {
		let params = new URLSearchParams();
		params.set('skip', skip.toString());

		this.xhr.startTracking('blogAll');

    return this.http.get(Config.API + '/blogs', {search: params})
        .map((res) => {
        	this.xhr.stopTracking('blogAll');
        	return res.json();
      	});
	}

	find(uri: string) {
		this.xhr.startTracking('blogSingle');

		return this.http.get(Config.API + '/blogs/uri/' + uri)
		  .map((res) => {
		  	this.xhr.stopTracking('blogSingle');
		  	return res.json();
			});
	}

	related(id: number, max: number = 3) {
		let params = new URLSearchParams();
		params.set('max', max.toString());

		this.xhr.startTracking('blogRelated');

		return this.http.get(Config.API + '/blogs/related/' + id, { search: params })
		  .map((res) => {
		  	this.xhr.stopTracking('blogRelated');
		  	return res.json();
			});
	}

	recent(skip: number = 0, take:number = 3, site_name?: string) {
		let params = new URLSearchParams();

		params.set('skip', skip.toString());
		params.set('take', take.toString());

		if (site_name) {
			params.set('division', site_name);
		}

		this.xhr.startTracking('blogRecent');

		return this.http.get(Config.API + '/blogs/recent', { search: params })
		  .map((res) => {
		  	this.xhr.stopTracking('blogRecent');
		  	return res.json();
			});
	}
}
