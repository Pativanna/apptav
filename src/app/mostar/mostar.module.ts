import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MostarPageRoutingModule } from './mostar-routing.module';

import { MostarPage } from './mostar.page';

import { AlumnoComponentComponent } from '../alumno-component/alumno-component.component';
import { ProfesorComponentComponent } from '../profesor-component/profesor-component.component';
import { AdministradorComponentComponent } from '../administrador-component/administrador-component.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MostarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MostarPage, AlumnoComponentComponent, ProfesorComponentComponent, AdministradorComponentComponent]
})
export class MostarPageModule {}