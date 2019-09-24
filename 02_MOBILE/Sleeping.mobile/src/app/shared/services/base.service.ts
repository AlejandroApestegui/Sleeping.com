import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { timeout, map } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';

@Injectable()
export class BaseService {

  public headers = new Headers({ 'Content-Type': 'application/json' });
  public http: Http = null;

  public URL_WEB: string;
  public URL_API: string;
  public SERVICE_TIME_OUT: number;

  public jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
  public options = new RequestOptions();

  constructor(@Inject(Http) http: Http) {
    const that = this;
    this.http = http;
    this.URL_API = environment ? environment.URL_API : '';
    this.SERVICE_TIME_OUT = 400000000;
    //that.headers.append('Authorization', sessionStorage.getItem('accessToken'));
    //that.options = new RequestOptions({ headers: that.headers });
  }

  public post(url, data) {
    const that = this;
    //that.headers.delete('Authorization');
    //that.headers.append('Authorization', sessionStorage.getItem('accessToken'));
    //that.options = new RequestOptions({ headers: that.headers });
    return that.http.post(url, data).pipe(timeout(that.SERVICE_TIME_OUT));
  }
  public get(url) {
    const that = this;    
    return that.http.get(url).pipe(timeout(that.SERVICE_TIME_OUT));
  }

}