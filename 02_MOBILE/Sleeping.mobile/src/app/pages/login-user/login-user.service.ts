import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {BaseService} from '../../shared/services/base.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoginUserService extends BaseService{
  constructor(public http: Http) {
    super(http);
  }

  getRecoveryPassword(data): Observable<any> {
    const that = this;
    const url = this.URL_API + '/api/Login/recuperarClave?email='+data;
    return that.get(url);
  }

  getUserLoginValidation(data){
    const that = this;
    const url = this.URL_API + '/api/Login/acceder';
    return that.post(url,data);
  }

  getChangePassword(data){
    const that = this;
    const url = this.URL_API + '/api/Login/cambiarClave';
    return that.post(url,data);
  }

  getRegisterUser(data){
    const that = this;
    const url = this.URL_API + '/api/Usuario/insertar';
    return that.post(url,data);
  }
  
}