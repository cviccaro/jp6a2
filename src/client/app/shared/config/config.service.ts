import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {Config} from './env.config';
import {Observer, Observable} from 'rxjs/Rx';

@Injectable()
export class ConfigService {
  constructor(public http: Http) { }

  get(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this._fetch()
        .subscribe((json: any) => {
          let config: { [key: string] : any } = {};
          json.forEach((setting: any) => {
            config[setting.name] = setting.value;
          });

          observer.next(config);
        });
    });
  }

  private _fetch() {
    return this.http.get(Config.API + '/settings')
      .map(res => res.json());
  }
}
