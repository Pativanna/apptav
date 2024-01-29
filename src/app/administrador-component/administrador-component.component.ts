import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/autenticar/authservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-administrador-component',
  templateUrl: './administrador-component.component.html',
  styleUrls: ['./administrador-component.component.scss'],
})
export class AdministradorComponentComponent implements OnInit {
  nuevoUsuarioForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.nuevoUsuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  crearUsuario() {
    if (this.nuevoUsuarioForm.valid) {
      const nuevoUsuario = this.nuevoUsuarioForm.value;

      this.authService.crearUsuario(nuevoUsuario).subscribe(
        (response) => {
          console.log('Usuario creado con éxito:', response);
          // Puedes realizar acciones adicionales después de iniciar sesión, si es necesario
        },
        (error) => {
          console.error('Error al crear usuario:', error);
          // Puedes manejar el error según tus necesidades
        }
      );
    } else {
      console.error('Formulario no válido. Verifica los campos.');
    }
  }
}