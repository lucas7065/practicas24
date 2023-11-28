import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


interface UserInfo {
  email: string,
  password: number,
  nombre: string,
  idUsuario: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3000';  
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userDetailsSubject = new BehaviorSubject<any>(null);
  private loggedInStatus = new BehaviorSubject<boolean>(this.isLoggedIn());
  
  constructor(private http: HttpClient) { }




  // Método público para obtener el observable
  get loggedInStatus$(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  // Método para verificar si hay una sesión iniciada
  isLoggedIn(): boolean {
    return !!localStorage.getItem('idUsuario');
  }

  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post(`${this.apiUrl}/login`, payload).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  registrarUsuario(datos: any): Observable<any> {
    // Validar que todos los campos estén completos
    if (!datos.nombre || !datos.apellido || !datos.email || !datos.password) {
      return throwError('Todos los campos son obligatorios.');
    }

    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(datos.email)) {
      return throwError('Formato de correo electrónico no válido.');
    }

    // Si pasa las validaciones, realizar la solicitud HTTP de registro
    return this.http.post(`${this.apiUrl}/registrar`, datos).pipe(
      catchError((error) => {
        // Puedes manejar el error aquí antes de emitirlo
        console.error('Error en el registro:', error);
        return throwError(error);
      })
    );
  }



  obtenerJuegosFavoritos(idUsuario: string): Observable<number[]> {
    const url = `${this.apiUrl}/juegos-favoritos`;

    // Configurar los parámetros de la solicitud
    const params = new HttpParams().set('idUsuario', idUsuario);

    // Realizar la solicitud HTTP con los parámetros
    return this.http.get<number[]>(url, { params }).pipe(
      catchError(this.handleHttpError)
    );
  }




  getUserDetails(idUsuario: string): Observable<UserInfo> {
    const url = `${this.apiUrl}/api/info-usuario`;
    
    const params = new HttpParams().set('idUsuario', idUsuario);

    return this.http.get<UserInfo>(url, { params }).pipe(
      catchError(this.handleHttpError)
    );
  }


  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.userDetailsSubject.next(null);
    localStorage.clear();
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud HTTP:', error);
    return throwError('Error al procesar la solicitud al servidor');
  }
}