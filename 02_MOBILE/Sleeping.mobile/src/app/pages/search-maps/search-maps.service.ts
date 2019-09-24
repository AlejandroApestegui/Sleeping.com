import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {BaseService} from '../../shared/services/base.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SearchMapsService extends BaseService{
  constructor(public http: Http) {
    super(http);
  }

  getProveedores(): Observable<any> {
    const that = this;
    const url = this.URL_API + '/api/Usuario/proveedores';
    return that.get(url);
  }

  registerReserva(data){
    const that = this;
    const url = this.URL_API + '/api/Servicio/registrarReserva';
    return that.post(url,data);
  }

  updateService(data){
    const that = this;
    const url = this.URL_API + '/api/Servicio/actualizar';
    return that.post(url,data);
  }
}
