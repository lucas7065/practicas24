import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUService {
  private url = 'http://localhost:3000/user';
  private authStatus = new BehaviorSubject<boolean>(this.isAuth());

  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(user:any){
    return this.http.post(`${this.url}/login`, user);
  }

  isAuth(): boolean{
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token') || token==undefined){
      return false;
    }
    return true;
  }

  getSessionStatus(): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(`${this.url}/session-status`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  setAuthStatus(isAuth: boolean){
    this.authStatus.next(isAuth);
  }


  insertarComentario(idUsuario: string, idJuego: number, puntaje: number): Observable<any> {
    const url = `${this.url}/puntear`;
    const body = { idUsuario, idJuego, puntaje };
    return this.http.post(url, body);
  }
  
  obtenerComentarios(idJuego: number): Observable<any> {
    const url = `${this.url}/show-scores`;
    return this.http.get(url, { params: { idJuego: idJuego.toString() } });
  }
  
  getUsername(idUsuario: number): Observable<any>{
    const params = new HttpParams().set('idUsuario', idUsuario);
    return this.http.get(`${this.url}/get-username`, { params });
    
  }
}
