import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaloPageRoutingModule } from './malo-routing.module';

import { MaloPage } from './malo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaloPageRoutingModule
  ],
  declarations: [MaloPage]
})
export class MaloPageModule {}
