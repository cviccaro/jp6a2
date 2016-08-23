import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Response } from '@angular/http';
import {BlogService, CacheService, ClientService, StaffService, WorkService} from '../shared/index';
import {Observable, Observer, Subscription} from 'rxjs/Rx';

@Injectable()
export class HomeGuard implements CanActivate, OnDestroy {
  data: { [key: string] : any } = {
    blogs: null,
    clients: null,
    staff: null,
    work: null
  };

  subs: Subscription[];

  constructor(
    public blogService: BlogService,
    public cacheService: CacheService,
    public clientService: ClientService,
    public staffService: StaffService,
    public workService: WorkService
  ) { }

  canActivate() {
    return Observable.create((observer: Observer<boolean>) => {
      this.subs = [
        this.blogService.recent()
          .subscribe(res => this.fetchComplete('blogs', res, observer)),
        this.clientService.featured()
          .subscribe(res => this.fetchComplete('clients', res, observer)),
        this.staffService.all()
          .subscribe(res => this.fetchComplete('staff', res, observer)),
        this.workService.recent(0, 6)
          .subscribe(res => this.fetchComplete('work', res, observer))
      ];
    });
  }

  fetchComplete(key: string, res: Response, observer: Observer<boolean>) {
    this.data[key] = res;
    this.cacheService.store(key, res);

    for (let k in this.data) {
      if (this.data[k] === null) return;
    }

    observer.complete();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      if (sub) sub.unsubscribe();
    });
  }
}
