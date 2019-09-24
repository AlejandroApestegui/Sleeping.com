import { Routes, RouterModule } from '@angular/router';
import { FornitureSettingComponent } from './forniture-setting.component';

const childRoutes: Routes = [
    {
        path: '',
        component: FornitureSettingComponent
    }
];

export const routing = RouterModule.forChild(childRoutes);
