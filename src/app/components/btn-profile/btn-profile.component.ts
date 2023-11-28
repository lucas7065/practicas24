import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-btn-profile',
  templateUrl: './btn-profile.component.html',
  styleUrls: ['./btn-profile.component.css']
})
export class BtnProfileComponent {
  isLoggedIn: boolean = false;
  
constructor(private authService: AuthService){
  
}

confirmarCerrarSesion(): void {
  if (confirm('¿Estás seguro de que deseas cerrar la sesión?')) {
    this.logout();
    this.ngOnInit();
  }
}


logout(){
   this.authService.logout();
}



ngOnInit() {
  // Verificar el estado de la sesión al iniciar el componente
  this.isLoggedIn = this.authService.isLoggedIn();
  // Suscribirse a cambios en el estado de la sesión
  this.authService.loggedInStatus$.subscribe((loggedIn: boolean) => {
  });
}


}
