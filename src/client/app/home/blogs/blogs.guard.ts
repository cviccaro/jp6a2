import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Response } from '@angular/http';
import { BlogService, CacheService } from '../../shared/index';
import { Observable, Observer, Subscription } from 'rxjs/Rx';

@Injectable()
export class BlogsGuard implements CanActivate, OnDestroy {
  sub: Subscription;

  constructor(
    public blogService: BlogService,
    public cache: CacheService
  ) { }

  canActivate() {
    return Observable.create((observer: Observer<boolean>) => {
      this.sub = this.blogService.recent(0, 12)
          .subscribe((res: Response) => {
            this.cache.store('blogs_page', res);
            observer.complete();
          });
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
