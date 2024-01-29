import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular'; // Importa NavController
@Component({
  selector: 'app-restrablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  formRecuperar: FormGroup;
  constructor(public fb: FormBuilder, private navCtrl: NavController) {

    this.formRecuperar = this.fb.group({
      'usuario': new FormControl("", Validators.required)
    });
  }
  recuperar() {
    if (this.formRecuperar.value.usuario != '') {
      this.navCtrl.navigateForward('/home');
    } else {
      console.log('Debe ingresar un usuario')
    }
  }

  ngOnInit() {
  }
}