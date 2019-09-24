import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabFooterPage } from './tab-footer.page';

const routes: Routes = [
  {
    path: '',
    component: TabFooterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports:[TabFooterPage],
  declarations: [TabFooterPage]
})
export class TabFooterPageModule {}
