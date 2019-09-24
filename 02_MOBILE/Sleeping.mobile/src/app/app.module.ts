import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import {HeaderPageModule} from '../app/pages/header/header.module';
import {TabFooterPageModule} from '../app/pages/tab-footer/tab-footer.module';
import {UserDetailPageModule} from '../app/pages/user-detail/user-detail.module';
import {UserIndexObservable} from '../app/pages/user-index/user-index.observable';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            HttpClientModule,
            HttpModule,
            HeaderPageModule,
            TabFooterPageModule,
            UserDetailPageModule,
            AgmCoreModule.forRoot({
              apiKey: 'AIzaSyBWesZIZIYJtNMkmV_oKPRgJoWL8xt4iq4'
            })
            ],
  providers: [
    StatusBar,
    SplashScreen,
    UserIndexObservable,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
