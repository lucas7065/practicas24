import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Llama a un método en el AuthService para obtener la información del usuario
    this.idUsuario = localStorage.getItem('idUsuario')?? "";
    this.nombre = localStorage.getItem('nombre');
    this.obtenerUsuario();
  }



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

 