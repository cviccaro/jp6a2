import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import {BlogService, CacheService} from './../../shared/index';
import {Observable, Observer, Subscription} from 'rxjs/Rx';

@Injectable()
export class BlogGuard implements CanActivate, OnDestroy {
  data: { [key: string] : any } = {
    blog: null,
    blog_related: null
  };

  subs: Subscription[];

  constructor(
    public blogService: BlogService,
    public cacheService: CacheService
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let segment: any = route.url[1];
    let slug: string = segment['path'];

    return Observable.create((observer: Observer<boolean>) => {
      this.subs = [
        this.blogService.find(slug)
          .subscribe((res: any) => {
            this.data['blog'] = res;
            this.cacheService.store('blog', res);

            this.blogService.related(res.id)
              .subscribe(res => {
                this.data['related'] = res;
                this.cacheService.store('blog_related', res);
                observer.complete();
              });
          })
      ];
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      if (sub) sub.unsubscribe();
    });
  }
}
