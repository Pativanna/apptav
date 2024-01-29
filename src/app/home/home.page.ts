import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../servicios/autenticar/authservice.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  correo = '';
  password = '';

  formLogin: FormGroup;
  
  constructor(public fb:FormBuilder,private router: Router,private appComponent:AppComponent, private authService: AuthService) { 
    this.formLogin=this.fb.group({
      'correo':new FormControl("",Validators.required),
      'password':new FormControl("",Validators.required),
    });
  }
  ngOnInit(): void {
    
  }

  login() {
    // Verificar si formLogin es nulo antes de acceder a sus propiedades
    if (this.formLogin) {
      console.log('Valor del formulario:', this.formLogin.value);
  
      // Utiliza los valores del formulario para obtener correo y password
      const correo = this.formLogin.get('correo')?.value;
      const password = this.formLogin.get('password')?.value;
  
      if (correo !== undefined && password !== undefined) {
        this.authService.login(correo, password).subscribe(
          (response) => {
            const { token, role } = response;
            this.authService.saveTokenAndRole(token, role);
            this.authService.setCorreo(correo);
            this.router.navigate(['/mostar'], { queryParams: { fromButton: true } });
          },
          (error) => {
            console.error('Error en el login:', error);
  
            if (error instanceof HttpErrorResponse) {
              console.error('Status:', error.status);
              console.error('Body:', error.error);
            }
          }
        );
      }
    }
  }
}
