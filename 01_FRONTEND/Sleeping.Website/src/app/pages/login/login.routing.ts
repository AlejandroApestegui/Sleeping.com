import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const childRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
