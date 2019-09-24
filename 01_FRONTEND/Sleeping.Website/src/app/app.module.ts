import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginModule} from '../app/pages/login/login.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PagesModule,
    routing,
    LoginModule    
  ],
  declarations: [
    AppComponent,
    
  ],
  bootstrap: [AppComponent],
  providers:[{ provide: LocationStrategy, useClass: HashLocationStrategy },]
})
export class AppModule { }
