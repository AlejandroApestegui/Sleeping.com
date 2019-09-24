import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchMapsPage } from './search-maps.page';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
const routes: Routes = [
  {
    path: '',
    component: SearchMapsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBWesZIZIYJtNMkmV_oKPRgJoWL8xt4iq4'
    }),
    AgmSnazzyInfoWindowModule
  ],
  declarations: [SearchMapsPage]
})
export class SearchMapsPageModule {}
