import { Routes, RouterModule } from '@angular/router';
import { ProviderMainComponent } from './provider-main.component';

const childRoutes: Routes = [
    {
        path: '',
        component: ProviderMainComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
