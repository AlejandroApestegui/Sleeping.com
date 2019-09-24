import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {LoginObservable} from './login.observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginValForm: NgForm;
  @ViewChild('recoveryForm') recoveryValForm: NgForm;
  @ViewChild('ChangePassWord') changePassForm: NgForm;
  
  public changeRecoveryLogin=false;
  public btnRecovery=true;
  public changePasswordLogin=false;
  public emailUsuario='';
  public btnChangePsw=true;
  public btnLogin=true;

  constructor( private _login:LoginService,
               private router:Router,
               private loginObservable:LoginObservable) { }

  ngOnInit() {
  }

  valEmail(){
    const that=this;
    if(that.recoveryValForm.value.correo === ''){
      that.btnRecovery=true;
    }
    else{
      that.btnRecovery=false;
    }
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

  validPasswords(event){
    const that=this;
    that.btnChangePsw=that.getMethodValPassword();
  }

  ValidChangePassword(){
    const that=this;    
    that.btnChangePsw=true;
    let form=that.changePassForm.value;
    if(form.NewPassword === form.NewPassConfirmation){    
        const data={
          email   : that.emailUsuario,
          passOld : form.oldPassword,
          passNew : form.NewPassConfirmation
        }
        that._login.getChangePassword(data).subscribe(
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
              }).then((result) => {
                if (result.value) {
                  that.router.navigate(['pages/provider-index']);
                }});
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

  valLogin(){
    const that=this;
    that.btnLogin=this.getMethodValLogin();
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
        if(resp.result === null){
          swal({
            type: 'info',
            title: resp.messageResponse,
          });
          that.btnLogin=false;
        }
        else{
		  let concat=resultado.id_rol+'-'+resultado.nombres+'-'+resultado.apellidos+'-'+resultado.login+'-'+resultado.id_usuario;

          if(resp.result.estado ==='3'){
            that.changePasswordLogin=true;
            sessionStorage.setItem('infoUser',concat);
            that.emailUsuario=resp.result.login;            
          }
          else{
            that.btnLogin=false;
            that.loginObservable.changeUserSession(resp.result);
            sessionStorage.setItem('infoUser',concat);
            that.router.navigate(['pages/provider-index']);
          }          
        }                
      },
      error=>{
        swal({
          type: 'error',
          title: 'Error Interno en el servicio de logueo.'
        });
      }
    )
    
  }

  RecoverPassword(){
    const that=this;
    that.changeRecoveryLogin=true;
  }

  getBack(){
    const that=this;
    that.changeRecoveryLogin=false;
  }

  getRecoveryMethod(){
    const that=this;
    that.btnRecovery=true;
    let data=that.recoveryValForm.value.correo;
    that._login.getRecoveryPassword(data).subscribe(
      res=>{
        let result=res.json();
        if(result.codeResponse === '9999' ){
          swal({
            type: 'error',
            title: result.messageResponse
          });
          that.btnRecovery=false;
        }
        else{          
          swal({
            type: 'success',
            title: result.messageResponse
          });
          that.changeRecoveryLogin=false;
        }
        
      },
      error=>{
        swal({
          type: 'error',
          title: 'Error Interno en el servicio de logueo.'
        });
      }
    );
  }
}
