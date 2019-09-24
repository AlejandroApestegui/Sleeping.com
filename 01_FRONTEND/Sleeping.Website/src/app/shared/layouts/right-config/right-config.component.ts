import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import {LoginObservable} from '../../../pages/login/login.observable';
import{LoginService} from '../../../pages/login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'right-config',
  templateUrl: './right-config.component.html',
  styleUrls: ['./right-config.component.scss'],
  providers: [LoginService]
})
export class RightConfigComponent implements OnInit {
  @ViewChild('ChangePassWord') changePassForm: NgForm;
  isConfigToggle: boolean = false;
  public btnChangePsw=true;
  public sessionUser:any;
  public getSessionUser:any=sessionStorage.infoUser;
  constructor(private _globalService: GlobalService,
              private loginObservable: LoginObservable,
              private _loginService:LoginService,
              private router:Router,) { }

  ngOnInit() { 
    const that=this;
    that.loginObservable.currentUserSession.subscribe(
      res=>{
        that.sessionUser=res;
        if(that.sessionUser.length === 0){
          let cad=that.getSessionUser.split('-');
          let data={
              login:cad[3]
            }
            that.sessionUser=data;
        }
      }
    )
  }

  configToggle() {
    this.isConfigToggle = !this.isConfigToggle;
    //this._globalService._sidebarToggleState(!this.isConfigToggle);
    this._globalService.dataBusChanged('sidebarToggle', !this.isConfigToggle);
  }

  cleanForm(){
    const that=this;
    const data={
      oldPassword: '',
      NewPassword:'',
      NewPassConfirmation:''
    }
    that.changePassForm.setValue(data);
  }

  getChangePasswordRequest(modal){
    const that=this;
    that.cleanForm();
    that.btnChangePsw=that.getMethodValPassword();
    modal.open();
  }
  getMethodValPassword(){
    const that=this;
    let form=that.changePassForm.value;
    if(form.oldPassword !== '' && form.NewPassword !== '' && form.NewPassConfirmation !==''){
      return false;
    }
    else{
      return true;
    }
  }

  validPasswords(){
    const that=this;
    that.btnChangePsw=that.getMethodValPassword();
  }

  ValidChangePassword(){
    const that=this;    
    that.btnChangePsw=true;
    let form=that.changePassForm.value;
    if(form.NewPassword === form.NewPassConfirmation){    
        const data={
          email   : that.sessionUser.login,
          passOld : form.oldPassword,
          passNew : form.NewPassConfirmation
        }
        that._loginService.getChangePassword(data).subscribe(
          res=>{
            const result=res.json();
            if(result.codeResponse ==='9999'){
              swal({
                type: 'error',
                title: result.messageResponse
              });
              that.btnChangePsw=false;
            }
            else{
              that.btnChangePsw=false;
              swal({
                type: 'success',
                title: result.messageResponse,
                allowOutsideClick: false
              });
            }
          },
          error=>{
            swal({
              type: 'error',
              title: 'Error Interno en el servicio de cambio de contraseña.'
            });
            that.btnChangePsw=false;
          }
        )
    }
    else{
      swal({
        type: 'error',
        title: 'La nueva contraseña y la confirmación de contraseña no son iguales'
      });
    }
  }

  closeModal(modal){
    const that=this;
    modal.close();
  }

  returnLogin(){
    const that=this;
    sessionStorage.removeItem("infoUser");
    that.router.navigate(['login']);
  }
}
