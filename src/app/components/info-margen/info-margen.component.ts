import { Component, Input, OnInit } from '@angular/core';
import { PerfilUsuarioComponent } from '../perfil-usuario/perfil-usuario.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FavoritosService } from 'src/app/favoritos.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-margen',
  templateUrl: './info-margen.component.html',
  styleUrls: ['./info-margen.component.css']
})
export class InfoMargenComponent implements OnInit{

  @Input() titulo: string = " ";
  @Input() miniatura: string = " ";
  @Input() url: string = " ";
  @Input() id: number = 0;
  @Input() distribuidor: string = " ";
  idUsuario: string = "";

  

  
  constructor(private router: Router, private servicio: FavoritosService) {}

  ngOnInit() {
    // Obtén el valor almacenado en el localStorage
    const idUsuario = localStorage.getItem('idUsuario');
  
    if (idUsuario) {
      this.idUsuario = idUsuario;
      console.log(this.idUsuario);
    } else {

      console.error('No se encontró el idUsuario en el localStorage.');
    }
  }

    enviarId() {
      // Verificar que tengas ambos IDs antes de enviar la solicitud al servidor
      if (this.idUsuario && this.id) {
        // Puedes llamar a tu servicio y pasar ambos IDs
        this.servicio.insertarJuegoFavorito(this.idUsuario, this.id).subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              title: '¡Juego agregado a favoritos!'
            });
            console.log('Respuesta del servidor:', response);
          },
          error => {
            console.error('Error al enviar IDs al servidor:', error);
            // Muestra el mensaje de error específico en la consola
            console.error('Mensaje de error del servidor:', error.message);
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Ya tienes este juego en tus favoritos.'
            });
          }
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Debes iniciar sesion para guardar este juego en tus favoritos."
        });
        this.router.navigate(["login"]);
        console.error('No se pudo obtener alguno de los IDs.');
      }
    }
  

  

}
