import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response, Request} from '@angular/http';
import {Observer, Observable} from 'rxjs/Rx';

import { XhrService } from './xhr.service';

@Injectable()
export class ApiHttp {
    working: any = {};
    index = 0;

    constructor(public http: Http, public xhr: XhrService) { }

    request(url: string|Request, options?: RequestOptionsArgs) : Observable<Response> {
        let key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        return Observable.create((observer: Observer<any>) => {
            this.http.request(url, options)
                .subscribe((res: Response) => {
                    this.xhr.stopTracking(key);
                    observer.next(res);
                });
        });
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        return Observable.create((observer: Observer<any>) => {
            this.http.get(url, options)
                .subscribe((res: Response) => {
                    this.xhr.stopTracking(key);
                    observer.next(res);
                });
        });
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        return Observable.create((observer: Observer<any>) => {
            this.http.post(url, body, options)
                .subscribe((res: Response) => {
                    this.xhr.stopTracking(key);
                    observer.next(res);
                });
        });
    }

    put(url: string, body: any, options?: RequestOptionsArgs) : Observable<Response> {
        let key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        return Observable.create((observer: Observer<any>) => {
            this.http.put(url, body, options)
                .subscribe((res: Response) => {
                    this.xhr.stopTracking(key);
                    observer.next(res);
                });
        });
    }

    delete(url: string, options?: RequestOptionsArgs) : Observable<Response> {
        let key = this.getNewIdentifier();

        this.xhr.startTracking(key);

        return Observable.create((observer: Observer<any>) => {
            this.http.delete(url, options)
               .subscribe((res: Response) => {
                   this.xhr.stopTracking(key);
                   observer.next(res);
               });
        });
    }

    /**
     * Private
     */
    private getNewIdentifier() {
        return 'request_' + this.index++;
    }
}
