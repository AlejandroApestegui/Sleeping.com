import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login-user', pathMatch: 'full' },  
  { path: 'user-index', loadChildren: './pages/user-index/user-index.module#UserIndexPageModule' },
  { path: 'header', loadChildren: './pages/header/header.module#HeaderPageModule' },
  { path: 'tab-footer', loadChildren: './pages/tab-footer/tab-footer.module#TabFooterPageModule' },
  { path: 'user-detail', loadChildren: './pages/user-detail/user-detail.module#UserDetailPageModule' },
  { path: 'login-user', loadChildren: './pages/login-user/login-user.module#LoginUserPageModule' },
  { path: 'user-reservation', loadChildren: './pages/user-reservation/user-reservation.module#UserReservationPageModule' },
  { path: 'search-maps', loadChildren: './pages/search-maps/search-maps.module#SearchMapsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
