import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {BaseService} from '../../shared/services/base.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserReservationService extends BaseService{
  constructor(public http: Http) {
    super(http);
  }

  lstReservation(data): Observable<any> {
    const that = this;
    const url = this.URL_API + '/api/Servicio/misReservas?usuario='+data;
    return that.get(url);
  }

  registerService(data){
    const that = this;
    const url = this.URL_API + '/api/Servicio/insertar';
    return that.post(url,data);
  }

  updateService(data){
    const that = this;
    const url = this.URL_API + '/api/Servicio/actualizar';
    return that.post(url,data);
  }
}