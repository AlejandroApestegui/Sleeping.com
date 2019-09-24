import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {BaseService} from '../../shared/services/base.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserDetailService extends BaseService{
  constructor(public http: Http) {
    super(http);
  }

  getHorario(data): Observable<any> {
    const that = this;
    const url = this.URL_API + '/api/Servicio/horarioDisponible?proveedor='+data.proveedor+'&servicio='+data.servicio+'&fecha='+data.fecha+'&usuarioActual='+data.usuario;
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