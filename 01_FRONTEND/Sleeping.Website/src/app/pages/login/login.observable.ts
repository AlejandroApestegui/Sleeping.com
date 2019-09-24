import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginObservable {

  private userSession = new BehaviorSubject<any>([]);
  public currentUserSession = this.userSession.asObservable();

  constructor() {
  }

  changeUserSession(val) {
    this.userSession.next(val);
  }

}