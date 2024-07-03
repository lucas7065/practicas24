
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthUService } from 'src/app/services/auth-u.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  email: any = "";
  nombre: any = "";
  idUsuario: any = "";
  password: any = "";

  isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Llama a un método en el AuthService para obtener la información del usuario

  };



/*
  obtenerUsuario(){
    let usuarioNuevo: any;
    this.authService.getUserDetails(this.idUsuario).subscribe(
      async (resultado)=>{
        console.log(resultado);
        usuarioNuevo = resultado;
      },
      (error)=>{
        console.error('Error al obtener informacion del usuario:', error);
      }
    )
    this.nombre = usuarioNuevo.nombre;
    this.email = usuarioNuevo.email;
    this.idUsuario = usuarioNuevo.idUsuario;
  };
  */

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

