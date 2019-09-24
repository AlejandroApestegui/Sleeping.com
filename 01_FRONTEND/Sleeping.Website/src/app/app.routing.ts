import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pages/login'
  }
];

export const routing = RouterModule.forRoot(appRoutes);
