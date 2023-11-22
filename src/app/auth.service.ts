import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  getUserDetails(): Observable<any> {
    return this.userDetailsSubject.asObservable();
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.userDetailsSubject.next(null);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}