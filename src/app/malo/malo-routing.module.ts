import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaloPage } from './malo.page';

const routes: Routes = [
  {
    path: '',
    component: MaloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaloPageRoutingModule {}
