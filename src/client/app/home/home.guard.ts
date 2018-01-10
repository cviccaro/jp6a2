import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { BlogService } from '../shared/blog/blog.service';
import { BlogsHttpResponse } from '../shared/blog/blog';
import { CacheService } from '../shared/core/services/cache.service';
import { ClientService } from '../shared/client/client.service';
import { StaffService } from '../shared/staff/staff.service';
import { ProjectService } from '../shared/project/project.service';
import { Config } from '../shared/core/config/env.config';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class HomeGuard implements CanActivate, OnDestroy {
  data: { [key: string] : any } = {
    blogs: null,
    clients: null,
    staff: null,
    projects: null
  };

  subs: Subscription[];

  constructor(
    public blogService: BlogService,
    public cacheService: CacheService,
    public clientService: ClientService,
    public staffService: StaffService,
    public projectService: ProjectService
  ) { }

  canActivate() {
    return Observable.create((observer: Observer<boolean>) => {
      const workLimit = window.innerWidth > Config.desktopWidth ? 6 : 1;
      this.subs = [
        this.blogService.recent()
          .subscribe(res => this.fetchComplete('blogs', res, observer)),
        this.clientService.featured()
          .subscribe(res => this.fetchComplete('clients', res, observer)),
        this.staffService.all()
          .subscribe(res => this.fetchComplete('staff', res, observer)),
        this.projectService.recent(0, workLimit)
          .subscribe(res => this.fetchComplete('projects', res, observer))
      ];
    });
  }

  fetchComplete(key: string, res: any, observer: Observer<boolean>) {
    this.data[key] = res;
    this.cacheService.store(key, res);

    for (let k in this.data) {
      if (this.data[k] === null) return;
    }

    observer.next(true);
    observer.complete();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      if (sub) sub.unsubscribe();
    });
  }
}
