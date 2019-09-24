import { Component, OnInit } from '@angular/core';
import {UserIndexService} from './user-index.service';
import { MenuController } from '@ionic/angular';
import {UserIndexObservable } from './user-index.observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.page.html',
  styleUrls: ['./user-index.page.scss'],
  providers: [UserIndexService]
})
export class UserIndexPage implements OnInit {

  public lstServicios:any=[];
  public slides=[
    { img: 'assets/images/img-1.png'},
    { img: 'assets/images/img-2.png'},
    { img: 'assets/images/img-3.png'}
  ]
  public loading=true;
  constructor(private indexService:UserIndexService,
              private menu: MenuController,
              private indexObservable:UserIndexObservable,
              private router:Router) { }

  ngOnInit() {
    const that=this;
    
    that.getList();
  }

  doRefresh(event){
    const that=this;
    console.log('Begin async operation');
    that.getList();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 5000);
  }

  toggleMenu(){
    const that=this;
    that.menu.toggle();
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }
  getList(){
    const that=this;
    that.indexService.listServicesGeneral().subscribe(
      res=>{
        const result=res.json();
        that.lstServicios=result;
        
        setTimeout(() => {
          that.loading=false;
          document.querySelector('ion-tab-bar')['style'].display = 'flex';
        }, 5000);
        
      }
    )
  }

  getDetail(element){
    const that=this;
    that.indexObservable.changeUserSession(element);
    that.router.navigate(['user-detail']);    
  }


}
