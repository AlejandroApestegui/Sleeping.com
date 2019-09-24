import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserIndexObservable {

  private serviceInfo = new BehaviorSubject<any>([]);
  public currentServiceInfo = this.serviceInfo.asObservable();

  constructor() {
  }

  changeUserSession(val) {
    this.serviceInfo.next(val);
  }

}