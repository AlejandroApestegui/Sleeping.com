import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { ModalModule } from 'ngx-modal';
import { FormsModule }   from '@angular/forms';

import { GlobalService } from './services/global.service';

import { NotificationComponent } from './components/notification/notification.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ContentTopComponent } from './layouts/content-top/content-top.component';
import { PagesTopComponent } from './layouts/pages-top/pages-top.component';
import { RightConfigComponent } from './layouts/right-config/right-config.component';
import {LoginObservable} from '../pages/login/login.observable';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        ModalModule,
        FormsModule
    ],
    providers: [
        GlobalService,
        LoginObservable
    ],
    declarations: [
        MenuComponent,
        SidebarComponent,
        PagesTopComponent,
        ContentTopComponent,
        NotificationComponent,
        RightConfigComponent,
        LoadingComponent
    ],
    exports: [
        SidebarComponent,
        PagesTopComponent,
        ContentTopComponent,
        NotificationComponent,
        RightConfigComponent,
        LoadingComponent
    ]
})
export class LayoutModule { }
