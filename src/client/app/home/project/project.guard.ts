import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Response } from '@angular/http';
import { CacheService, WorkService } from './../../shared/index';
import { Observable, Observer, Subscription } from 'rxjs/Rx';

@Injectable()
export class ProjectGuard implements CanActivate, OnDestroy {
  data: { [key: string] : any } = {
    blogs: null,
    clients: null,
    staff: null,
    projects: null
  };

  sub: Subscription;

  constructor(
    public cacheService: CacheService,
    public workService: WorkService
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let segment: any = route.url[1];
    let slug: string = segment['path'];

    return Observable.create((observer: Observer<boolean>) => {
      this.sub = this.workService.find(slug)
          .subscribe(
            (res: Response) => {
              this.cacheService.store('project', res);
              observer.next(true);
              observer.complete();
            },
            (err: Error) => {
              return Observable.of(false);
            }
          );
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
