import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  public getSessionUser:any=sessionStorage.infoUser;
  public correo='';
  constructor(private router:Router,) { }

  ngOnInit() {
    const that=this;
    
  }

  CloseSession(){
    const that=this;
    //that.router.navigate(['login-user']);
    sessionStorage.removeItem("infoUser");
    window.location.href='/login-user';
    
  }
}
