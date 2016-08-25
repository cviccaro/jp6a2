import {CanActivate} from '@angular/router';
import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';
import {CacheService} from '../cache/cache.service';
import {ConfigService} from './config.service';
import {Response} from '@angular/http';

@Injectable()
export class ConfigGuard implements CanActivate, OnDestroy {
  public sub: Subscription;

  constructor(public cache: CacheService, public service: ConfigService) { }

  canActivate(): boolean|Observable<boolean> {
    return Observable.create((observer: any) => {
      this.sub = this.service.get().subscribe((res: Response)=> {
        this.cache.store('config', res);
        observer.complete(true);
      });
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
