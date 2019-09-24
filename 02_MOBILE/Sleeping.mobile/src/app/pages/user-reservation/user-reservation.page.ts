import { Component, OnInit } from '@angular/core';
import { UserReservationService} from './user-reservation.service'

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.page.html',
  styleUrls: ['./user-reservation.page.scss'],
  providers: [UserReservationService]
})
export class UserReservationPage implements OnInit {
  public getSessionUser:any=sessionStorage.infoUser;
  public lstServicios:any=[];
  constructor(private userReserv: UserReservationService) { }

  ngOnInit() {
    const that=this;
    that.getLstReservation();
  }
  doRefresh(event){
    const that=this;
    console.log('Begin async operation');
    that.getLstReservation();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 5000);
  }

  getLstReservation(){
    const that=this;
    let user=that.getSessionUser.split('-');
    let data=user[4];
    that.userReserv.lstReservation(data).subscribe(
      res=>{
        const result=res.json();
        that.lstServicios=result;
        that.lstServicios.forEach(element => {
          element.descEstado=(element.reserva.estado === 0)?'DISPONIBLE':(element.reserva.estado === 2)?'P. CONFIRMAR':(element.reserva.estado === 1)?'APROBADO':'RECHAZADO';
        });
      }
    )
  }


}
