import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profesor-component',
  templateUrl: './profesor-component.component.html',
  styleUrls: ['./profesor-component.component.scss'],
})
export class ProfesorComponentComponent implements OnInit {
  codigoClaseForm: FormGroup;

  qrData: string = '';
  qrCodeImage: string = '';
  scannerIsRunning: boolean = false;
  emailInfoMostar: String= '';

  constructor(private formBuilder: FormBuilder) {
    this.codigoClaseForm = this.formBuilder.group({
      codigoClase: ['', [Validators.required]],
    });
  }

  ngOnInit() { }

  generateQRCode() {
    if (this.codigoClaseForm.valid) {
      const codigoClase = this.codigoClaseForm.value;
      const emailRecipient = 'ca.abarzuac@profesor.duoc.cl';
      const emailSubject = 'Asistencia';
      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
      const emailBody = `Codigo:${codigoClase.codigoClase}\nFecha y Hora: ${formattedDate}`;
      const emailInfo = `mailto:${emailRecipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      this.emailInfoMostar = emailInfo;
      QRCode.toDataURL(emailInfo, (err: any, url: any) => {
        if (err) {
          console.error(err);
        } else {
          this.qrCodeImage = url;
        }
      });
    }
  }


  openQRCodeWindow() {
    if (this.qrCodeImage) {
      window.open(this.qrCodeImage, '_blank');
    } else {
      console.error('no se a generado nada');
    }
  }

}
