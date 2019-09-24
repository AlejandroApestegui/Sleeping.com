import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import {LoginUserService} from './login-user.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.page.html',
  styleUrls: ['./login-user.page.scss'],
  providers: [LoginUserService]
})
export class LoginUserPage implements OnInit {
  @ViewChild('loginForm',{ static: false, }) loginValForm: NgForm;
  @ViewChild('registerForm',{ static: false, }) regValForm: NgForm;
  public btnLogin=true;
  public flgNewUser:any=false;
  public getSessionUser:any=sessionStorage.infoUser;
  constructor(public alertController: AlertController,
              public _login: LoginUserService,
              private router:Router,
              public menuCtrl:MenuController,
              public toastController: ToastController) { }

  ngOnInit() {
    const that=this;
    document.querySelector('ion-tab-bar')['style'].display = 'none';
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  getUserLogin(){
    const that=this;
    that.btnLogin=true;
    const data={
      email    : that.loginValForm.value.usuario,
      password : that.loginValForm.value.password
    }
    that._login.getUserLoginValidation(data).subscribe(
      res=>{
        let resp=res.json();
        let resultado=resp.result;
        //let concat=resultado.id_rol+'-'+resultado.nombres+'-'+resultado.apellidos+'-'+resultado.login+'-'+resultado.id_usuario;
        if(resp.result === null){
          that.presentAlert(resp);
          that.btnLogin=false;
        }
        else{
          if(resp.result.estado ==='3'){
            //that.changePasswordLogin=true;
            //sessionStorage.setItem('infoUser',concat);
           // that.emailUsuario=resp.result.login;            
          }
          else{
              if(resp.result.id_rol ==='1'){
                that.btnLogin=false;
                let concat=resultado.id_rol+'-'+resultado.nombres+'-'+resultado.apellidos+'-'+resultado.login+'-'+resultado.id_usuario;
                //that.loginObservable.changeUserSession(resp.result);
                sessionStorage.setItem('infoUser',concat);
                that.router.navigate(['user-index']);                
              }
            else{
              that.presentUsertAlert('');
            }
          }          
        }                
      },
      error=>{
        that.alertErrorService();
      }
    )
    
  }

  async presentUsertAlert(res:any) {
    const alert = await this.alertController.create({
      header: 'Acceso denegado.',
      subHeader: '',
      message: 'Este usuario es de perfil Proveedor, para acceder con este usuario debe entrar a http://bed-app.azurewebsites.net/webapp/',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlert(res:any) {
    const alert = await this.alertController.create({
      header: 'Datos erroneos',
      subHeader: '',
      message: res.messageResponse,
      buttons: ['OK']
    });
    await alert.present();
  }
  async alertErrorService() {
    const alert = await this.alertController.create({
      header: 'Error en el sistema',
      subHeader: '',
      message: 'Hubo un problema en el servicio de respuesta',
      buttons: ['OK']
    });

  await alert.present();
  }

  valLogin(){
  const that=this;
  that.btnLogin=that.getMethodValLogin();   
  }

  getNewUser(){
    const that=this;
    that.flgNewUser=true;
  }

  getMethodValLogin(){
    const that=this;
    let form=that.loginValForm.value;
    if(form.usuario !== '' && form.password !== ''){
      return false;
    }
    else{
      return true;
    }
  }

  getTodayFormat(data:any){
    let current_datetime = new Date(data);
    let dataMonth= current_datetime.getMonth()+1;
    let current_month= (dataMonth>=10)?dataMonth:'0'+dataMonth;
    let formatted_date = current_datetime.getDate() + "/" + current_month + "/" + current_datetime.getFullYear();
    return formatted_date;
  }

  ReturnLogin(){
    const that=this;
    that.flgNewUser=false;
  }

  RegistrarUsuario(){
    const that=this;
    let form=that.regValForm.value; 
    let result=that.formValidation(form);  
    let fecNacimiento=that.getTodayFormat(form.usuFecNac);
    if(result){
      let data={
        "id_usuario": "",
        "id_rol": "1",
        "nombres": form.usuName.toUpperCase(),
        "apellidos": form.usuLastName.toUpperCase(),
        "login": form.usuario,
        "pass": form.password,
        "edad": "0",
        "direccion": form.usuDireccion.toUpperCase(),
        "documento": form.usuDoc,
        "empresa": form.usuEmpresa.toUpperCase(),
        "fechaNacimiento": fecNacimiento,
        "estado": "1",
        "latitud": "",
        "longitud": ""
      }
      that._login.getRegisterUser(data).subscribe(
        res=>{
          that.flgNewUser=false;
          that.presentToast();
        }
      );
    }
    else{
      return false;
    }
  }

  onlyforText(event) {
    var regex = new RegExp("^[a-zA-ZñÑáéíóúÁÉÍÓÚ \s]+");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  formValidation(form:any){
    const that=this;
    if(form.password === "" || form.usuDireccion === "" || form.usuDoc === "" ||
       form.usuEmpresa ==="" || form.usuFecNac === "" ||
       form.usuLastName === "" || form.usuName === "" || form.usuario === ""){
        that.formRegisterAlert();
        
        return false;
       }
       else{
        return true;
       }
  }

  async formRegisterAlert() {
    const alert = await this.alertController.create({
      header: 'Datos inválidos',
      subHeader: '',
      message: 'Debe llenar todo el formulario para el registro de usuario.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se ha registrado correctamente.',
      duration: 3000
    });
    toast.present();
  }
}
