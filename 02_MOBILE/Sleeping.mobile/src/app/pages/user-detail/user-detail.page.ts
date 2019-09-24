import { Component, OnInit, ViewChild } from '@angular/core';
import {UserIndexObservable} from '../user-index/user-index.observable';
import {UserDetailService} from '../user-detail/user-detail.service';
import { NgForm } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
  providers: [UserDetailService]
})
export class UserDetailPage implements OnInit {

  @ViewChild('HorarioForm',{ static: false, }) horarioForm: NgForm;
  public DetailService:any;
  public LstHorario:any=[];
  public isChecked=false;
  public getSessionUser:any=sessionStorage.infoUser;
  constructor(private indexObservable:UserIndexObservable,
              private userServices: UserDetailService,
              public toastController: ToastController,
              private router:Router,
              public alertController: AlertController) { }

  ngOnInit() {
    const that=this;

    that.getObservableDetail();
  }

  getObservableDetail(){
    const that=this;
    that.LstHorario=[];
    that.indexObservable.currentServiceInfo.subscribe(
      res=>{
        that.DetailService=res;
        that.getLstHorario(that.DetailService);
      }
    )
  }

  getLstHorario(element){
    const that=this;
    let fecha=that.getTodayFormat();
    let info=that.getSessionUser.split('-');
    let data={
      proveedor:Number(element.idUsuario),
      servicio:element.idServicio,
      fecha:fecha,
      usuario:info[4]
    }
    that.userServices.getHorario(data).subscribe(
      res=>{
          const result=res.json();
          that.LstHorario=result;

          that.LstHorario.forEach(element => {
            element.descEstado=(element.estado === 0)?'DISPONIBLE':(element.estado === 2)?'P. CONFIRMAR':(element.estado === 1)?'APROBADO':'RECHAZADO';
          });
          that.horarioForm.reset();
          
      }
    )
  }

  RegisterReserva(){
    const that=this;
    let formRadio=that.horarioForm.value;
    if(formRadio.rbt_Horario === undefined){
      that.formRegisterAlert();
      return false;
    } 
    else{
    let div= that.getSessionUser.split('-');
    let fecha=that.getTodayFormat();
    const data={
      "idProveedor": that.DetailService.idUsuario,
      "idServicio": that.DetailService.idServicio,
      "idUsuario": div[4],
      "idOrden": formRadio.rbt_Horario,
      "fecha": fecha,
    }
    that.userServices.registerReserva(data).subscribe(
      res=>{
        const result=res.json();
        that.presentToast(result);
        that.router.navigate(['user-index']);
      }
    );
  }

  }

  async formRegisterAlert() {
    const alert = await this.alertController.create({
      header: 'Acceso denegado',
      subHeader: '',
      message: 'Debe seleccionar al menos un horario para continuar.',
      buttons: ['OK']
    });
    await alert.present();
  }

  getTodayFormat(){
    let current_datetime = new Date();
    let dataMonth= current_datetime.getMonth()+1;
    let current_month= (dataMonth>=10)?dataMonth:'0'+dataMonth;
    let formatted_date = current_datetime.getDate() + "/" + current_month + "/" + current_datetime.getFullYear();
    return formatted_date;
  }

  async presentToast(res:any) {
    const toast = await this.toastController.create({
      message: res.messageResponse,
      duration: 4000
    });
    toast.present();
  }

}
