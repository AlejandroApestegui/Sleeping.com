import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderMainComponent } from './provider-main.component';
import { routing } from './provider-main.routing';
import { SharedModule } from '../../shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NgxEchartsModule,
        routing
    ],
    declarations: [
        ProviderMainComponent
    ]
})
export class ProviderMainModule { }
