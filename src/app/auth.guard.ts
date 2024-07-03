import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUService } from './services/auth-u.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  /*
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // Redirige a la página de inicio de sesión si el usuario no está autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
    */

  constructor(private authUService: AuthUService, private router: Router) {

  }

  canActivate(): boolean{
    if(!this.authUService.isAuth()){
      console.log('Token no es valido o ya expiro.');
      alert('Inicie sesion para acceder.');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
