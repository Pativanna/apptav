import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/autenticar/authservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mostar',
  templateUrl: 'mostar.page.html',
  styleUrls: ['mostar.page.scss'],
})
export class MostarPage implements OnInit {
  correo: string | null = null;
  role$: Observable<string | null>;
  correoPrefix: string = '';

  constructor(private authService: AuthService) {
    this.role$ = this.authService.getRole();
  }

  logout(): void {
    this.authService.clearAll();
  }

  ngOnInit() {
    this.authService.getCorreo().subscribe(correo => {
      this.correo = correo;
      if (correo !== null) {
        this.correoPrefix = correo.split('@')[0];
      }
    });

    this.role$.subscribe(role => {
      console.log('Role:', role);
    });
  }
}