import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';



interface UserInfo {
  email: string,
  password: number
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3000';  
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userDetailsSubject = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient) { }



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





  getUserDetails(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.apiUrl}/api/userinfo`);
  }


  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.userDetailsSubject.next(null);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
  
/*
  login(username:string, password:string): Observable<any>{
    const credentials = {username, password};

    return this.http.post<any>('${this.apiUrl}/login', credentials).pipe(
      tap((response)=>{
        localStorage.setItem('token', response.token);
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  private handleError<T>(operation = 'operation', result?:T{
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  })
}
*/
