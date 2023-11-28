import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; 
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  insertarJuegoFavorito(idUsuario: string, idJuego: number): Observable<any> {
    const url = `${this.apiUrl}/insertar-juego-favorito`;
    const body = { idUsuario: idUsuario, idJuego: idJuego };

    return this.http.post(url, body)
      .pipe(
        catchError(this.handleHttpError)
      );
  }

  eliminarJuegoFavorito(idUsuario:string, idJuego: number): Observable<any>{
    const url = `${this.apiUrl}/eliminar-juego-favorito`;
    const body = { idUsuario: idUsuario, idJuego: idJuego };

    return this.http.post(url, body)
      .pipe(
        catchError(this.handleHttpError)
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



  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud HTTP:', error);
    return throwError('Error al procesar la solicitud al servidor');
  }
}



