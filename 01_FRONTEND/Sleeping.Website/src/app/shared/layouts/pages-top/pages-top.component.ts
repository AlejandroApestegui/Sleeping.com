import {AfterViewInit, Component, Input} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {LoginObservable} from '../../../pages/login/login.observable';


@Component({
  selector: 'pages-top',
  templateUrl: './pages-top.component.html',
  styleUrls: ['./pages-top.component.scss'],
})
export class PagesTopComponent implements AfterViewInit {
  avatarImgSrc: string = 'assets/images/avatar.jpg';
  userName: string = '';
  userEmail: string = '';
  userProfile:string='';
  public getSessionUser:any=sessionStorage.infoUser;

  sidebarToggle: boolean = true;
  tip = {ring: true, email: true};

  constructor(private _globalService: GlobalService,
              private loginObservable: LoginObservable,) {
  }

  public _sidebarToggle() {
    /* this._globalService.sidebarToggle$.subscribe(sidebarToggle => {
      this.sidebarToggle = sidebarToggle;
    }, error => {
      console.log('Error: ' + error);
    }); */

    this._globalService.data$.subscribe(data => {
      if (data.ev === 'sidebarToggle') {
        this.sidebarToggle = data.value;
      }
    }, error => {
      console.log('Error: ' + error);
    });
    this._globalService.dataBusChanged('sidebarToggle', !this.sidebarToggle);


    //this._globalService._sidebarToggleState(!this.sidebarToggle);
  }


  ngAfterViewInit(): void {
    this.sidebarToggle = window.innerWidth >= 970;
    this.getUsers();
  }
  getUsers(){
    const that=this;
    that.loginObservable.currentUserSession.subscribe(
      res=>{
        let result=res;
        if(result.length === 0){
          let cad=that.getSessionUser.split('-');
          let nom =cad[1].split(' ');
          let ape =cad[2].split(' ');
          that.userName=nom[0]+' '+ape[0];
          that.userEmail=cad[3];
          that.userProfile=(cad[0] ==='2')?'PROVEEDOR':'USUARIO STANDARD'; 
        }
        else{
            let nom =res.nombres.split(' ');
            let ape =res.apellidos.split(' ');
            that.userName=nom[0]+' '+ape[0];
            that.userEmail=res.login;
            that.userProfile=(res.id_rol ==='2')?'PROVEEDOR':'USUARIO STANDARD';
        }
      }
    )
  }
}

