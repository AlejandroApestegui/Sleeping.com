import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { LoginMobileComponent} from './login-mobile/login-mobile.component'

export const childRoutes: Routes = [    
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',        
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'login-mobile',
        component: LoginMobileComponent,
    },
    {
        path: 'pages',
        component: PagesComponent,
        children: [            
            { path: 'index', loadChildren: './index/index.module#IndexModule' },
            { path: 'editor', loadChildren: './editor/editor.module#EditorModule' },
            { path: 'icon', loadChildren: './icon/icon.module#IconModule' },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
            { path: 'form', loadChildren: './form/form.module#FormModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'ui', loadChildren: './ui/ui.module#UIModule' },
            { path: 'table', loadChildren: './table/table.module#TableModule' },
            { path: 'menu-levels', loadChildren: './menu-levels/menu-levels.module#MenuLevelsModule' },
            { path: 'provider-index', loadChildren: './provider-main/provider-main.module#ProviderMainModule' },
            { path: 'forniture-setting', loadChildren: './forniture-setting/forniture-setting.module#FornitureSettingModule' },            
            { path: 'reservation', loadChildren: './reservation/reservation.module#ReservationModule' },
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
