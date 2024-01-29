import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostarPage } from './mostar.page';

const routes: Routes = [
  {
    path: '',
    component: MostarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostarPageRoutingModule {}
