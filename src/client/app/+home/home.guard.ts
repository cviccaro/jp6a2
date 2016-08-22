import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {BlogService, CacheService, ClientService, StaffService, WorkService} from '../shared/index';
import {Observable} from "rxjs/Rx";

@Injectable()
export class HomeGuard implements CanActivate {
  data = {
    blogs: null,
    clients: null,
    staff: null,
    work: null
  };

  constructor(
    public blogService: BlogService,
    public cacheService: CacheService,
    public clientService: ClientService,
    public staffService: StaffService,
    public workService: WorkService
  ) { }

  canActivate(next, state) {
    return Observable.create(observer => {
      console.log('observable start');
      this.blogService.recent()
        .subscribe(res => this.fetchComplete('blogs', res, observer));

      this.clientService.featured()
        .subscribe(res => this.fetchComplete('clients', res, observer));

      this.staffService.all()
        .subscribe(res => this.fetchComplete('staff', res, observer));

      this.workService.recent(0, 6)
        .subscribe(res => this.fetchComplete('work', res, observer));
    });
  }

  fetchComplete(key, res, observer) {
    this.data[key] = res;
    this.cacheService.store(key, res);

    for (let k in this.data) {
      if (this.data[k] === null) return;
    }
    
    observer.complete(true);
  }
}
