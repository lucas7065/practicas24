import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario = {
    email: "",
    password: ""
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Llama a un método en el AuthService para obtener la información del usuario
    this.obtenerInformacionUsuario();
  }

  obtenerInformacionUsuario(): void {
    // Aquí asumimos que AuthService tiene un método para obtener la información del usuario
    // Ajusta esto según la implementación real de tu AuthService
    this.authService.getUserDetails().subscribe(
      (data: any) => {
        // Actualiza el objeto usuario con la información obtenida
        this.usuario = data;
      },
      error => {
        console.error('Error al obtener información del usuario', error);
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

 
