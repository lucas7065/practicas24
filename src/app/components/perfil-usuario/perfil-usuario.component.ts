import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario = {
    email: "",
    password: "",
    favoritos: []
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Llama a un método en el AuthService para obtener la información del usuario
    this.obtenerInformacionUsuario();
  }

  obtenerInformacionUsuario(): void {
    // Llamada al método getUserDetails() del servicio AuthService
    this.authService.getUserDetails().subscribe(
      (data: any) => {
        // En caso de éxito, actualiza el objeto usuario con la información obtenida
        this.usuario = data;
        console.log("Información del usuario obtenida con éxito:", this.usuario);
      },
      error => {
        // En caso de error, imprime un mensaje detallado en la consola
        console.error('Error al obtener información del usuario', error);
  
        // Si el error es una instancia de HttpErrorResponse, imprime más detalles
        if (error instanceof HttpErrorResponse) {
          console.error('Status:', error.status);
          console.error('Mensaje de error:', error.error);
        }
      }
    );
  }

  confirmarCerrarSesion(): void {
    if (confirm('¿Estás seguro de que deseas cerrar la sesión?')) {
      this.logout();
    }
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}

 