import { Routes, RouterModule } from '@angular/router';
import { ReservationComponent } from './reservation.component';
import { ReservationControlComponent } from './components/reservation-control/reservation-control.component';

const childRoutes: Routes = [
    {
        path: '',
        component: ReservationComponent,
        children: [
            { path: 'res-control', component: ReservationControlComponent }
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);