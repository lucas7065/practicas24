import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; 


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

  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud HTTP:', error);
    return throwError('Error al procesar la solicitud al servidor');
  }


  obtenerJuegosFavoritos(idUsuario: string): Observable<any> {
    const url = `${this.apiUrl}/juegos-favoritos`;
  
    // Puedes incluir el idUsuario como parámetro de la consulta
    const params = { idUsuario };
  
    return this.http.get(url, { params })
      .pipe(
        catchError(this.handleHttpError)
      );
  }
}


