import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FornitureSettingComponent } from './forniture-setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './forniture-setting.routing';
import { SharedModule } from '../../shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-modal';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NgxEchartsModule,
        HttpModule,
        routing,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
    ],
    declarations: [
        FornitureSettingComponent
    ]
})
export class FornitureSettingModule { }
