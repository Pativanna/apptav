import { Component } from '@angular/core';
import { AuthService } from './servicios/autenticar/authservice.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  ngOnInit(): void{
    const token = this.authService.getToken();
    if (token) {
      // El token existe, el usuario está autenticado
      // Realiza acciones adicionales según sea necesario
    }
  }
  public username:string ="";
}
