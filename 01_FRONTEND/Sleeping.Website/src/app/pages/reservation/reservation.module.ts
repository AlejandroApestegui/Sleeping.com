import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './reservation.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
/* components */
import { ReservationComponent } from './reservation.component';
import { ReservationControlComponent } from './components/reservation-control/reservation-control.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing,
        NgxPaginationModule
    ],
    declarations: [
        ReservationComponent,
        ReservationControlComponent
    ]
})
export class ReservationModule { }
