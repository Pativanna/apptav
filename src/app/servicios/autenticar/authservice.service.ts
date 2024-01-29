import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://129.151.104.147:8000/api';

  private correoSubject = new BehaviorSubject<string | null>(this.getCorreoFromLocalStorage());
  correo$: Observable<string | null> = this.correoSubject.asObservable();

  private tokenSubject = new BehaviorSubject<string | null>(this.getTokenFromLocalStorage());
  token$: Observable<string | null> = this.tokenSubject.asObservable();

  private roleSubject = new BehaviorSubject<string | null>(this.getRoleFromLocalStorage());
  role$: Observable<string | null> = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(correo: string, password: string): Observable<any> {
    const credentials = { correo, password };

    return this.http.post(`${this.apiUrl}/autenticar/`, credentials).pipe(
      tap(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
          const token = response.token;
          const decodedToken: any = jwtDecode(token);
          console.log('Token decodificado:', decodedToken);
          const role = decodedToken.role;
          this.saveTokenAndRole(token, role);
          this.setCorreo(correo);
        },
        (error) => {
          console.error('Error durante el inicio de sesión:', error);
          let errorMessage = 'Error durante el inicio de sesión.';

          if (error.error && error.error.error === 'Credenciales inválidas o cuenta inactiva') {
            if (error.error.mensaje) {
              errorMessage = error.error.mensaje;
            } else {
              errorMessage = 'Credenciales inválidas o cuenta inactiva. Verifica tus datos e intenta nuevamente.';
            }
          }
          alert(errorMessage);
          return throwError(errorMessage);
        }
      )
    );
  }

  crearUsuario(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/usuarios/`, data);
  }

  saveTokenAndRole(token: string, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    this.setToken(token);
    this.setRole(role);
  }

  setRole(role: string): void {
    this.roleSubject.next(role);
    localStorage.setItem('role', role);
  }

  getRole(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  clearAll(): void {
    this.roleSubject.next(null);
    localStorage.removeItem('role');
    console.log('Role limpiado.');
    this.tokenSubject.next(null);
    localStorage.removeItem('token');
    console.log('token Limpiado.');
    this.correoSubject.next(null);
    localStorage.removeItem('correo');
    console.log('correo Limpiado.');
  }

  setCorreo(correo: string): void {
    this.correoSubject.next(correo);
    localStorage.setItem('correo', correo);
  }

  getCorreo(): Observable<string | null> {
    return this.correoSubject.asObservable();
  }

  private setToken(token: string): void {
    this.tokenSubject.next(token);
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  private getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('token');
  }

  private getRoleFromLocalStorage(): string | null {
    return localStorage.getItem('role');
  }

  private getCorreoFromLocalStorage(): string | null {
    return localStorage.getItem('correo');
  }
}

