import { Component, Input, OnInit } from '@angular/core';
import { AuthUService } from '../../services/auth-u.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit{

  comentario = {
    autor:  '',
    mensaje: '',
    fechaPublicacion: '',
    puntaje: 0
  };

  @Input() id: number =0;

  constructor(private servicio: AuthUService, private router: Router){}

  listaPuntajes:  Array<number>=[1,2,3,4,5]
  mensajeActual: string = "";
  puntajePromedio: number = 0;
  listaComentarios: Array<ComentariosComponent["comentario"]> = [];

  ngOnInit(){
    this.cargarComentarios();
  }

  cargarComentarios() {
    this.servicio.obtenerComentarios(this.id).subscribe(
      (comentarios: any[]) => {
        this.listaComentarios = comentarios.map(c => ({
          autor: '', // Puedes ajustar esto para obtener el nombre del usuario
          mensaje: '', // Ajusta esto si tienes mensajes asociados a los comentarios
          fechaPublicacion: '', // Ajusta esto si tienes fechas de publicación
          puntaje: c.puntaje
        }));
        this.promPuntaje();
      },
      error => {
        console.error('Error al cargar comentarios:', error);
      }
    );
  }

  promPuntaje() {
    let suma = 0;
    if (this.listaComentarios.length != 0) {
      this.listaComentarios.forEach(comentario => {
        suma += comentario.puntaje;
      });
      this.puntajePromedio = suma / this.listaComentarios.length;
    }
  }

  actualizarPuntaje(puntaje: number) {
    this.comentario.puntaje = puntaje;
  }

  publicarComentario() {
    this.comentario.autor = localStorage.getItem('nombre') ?? "";
    let idUsuario = localStorage.getItem('idUsuario') ?? "";
    this.comentario.fechaPublicacion = new Date().toLocaleString();
    this.listaComentarios.push(Object.assign({}, this.comentario));

    this.servicio.insertarComentario(idUsuario, this.id, this.comentario.puntaje).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        this.cargarComentarios(); // Recargar los comentarios para obtener los más recientes
        Swal.fire({
          title:"¡Gracias!",
          text: "Puntaje agregado correctamente",
          icon: "success"
        });
      },
      error => {
        console.error('Error al enviar IDs al servidor:', error);
        console.error('Mensaje de error del servidor:', error.message);
        Swal.fire({
          title:"Error",
          text: "No se pudo agregar tu puntaje. Debes iniciar sesion.",
          icon: "error"
        });
        this.router.navigate(["login"])
      }
    );

    this.comentario.mensaje = ""; // Limpia el mensaje actual
    this.comentario.puntaje = 0; // Restablece el puntaje
  }
/*
  promPuntaje(){
    let suma = 0;
    if(this.listaComentarios.length != 0)
    {
      this.listaComentarios.forEach(comentario => {
        suma += comentario.puntaje;
      });
      this.puntajePromedio = (suma / this.listaComentarios.length);
    }
  }

  actualizarPuntaje(puntaje: number){
    this.comentario.puntaje = puntaje;
  }

  publicarComentario(){
    this.comentario.autor = localStorage.getItem('nombre') ?? "";
    let idAutor = localStorage.getItem('idUsuario') ?? "";
    this.comentario.fechaPublicacion = new Date().toLocaleString();
    this.listaComentarios.push(Object.assign({}, this.comentario));
    


    this.servicio.insertarComentario(idAutor, this.id, this.comentario.puntaje).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        // Puedes manejar la respuesta del servidor aquí
      },
      error => {
        console.error('Error al enviar IDs al servidor:', error);
        // Muestra el mensaje de error específico en la consola
        console.error('Mensaje de error del servidor:', error.message);
        // Puedes manejar los errores aquí
      }
    );

    this.ngOnInit();
  }

  /*
  obtenerComentario(){
    this.servicio.obtenerJuegosFavoritos(this.id).subscribe(
      (resultado)=>{
        this.listaId = resultado;
        console.log('Juegos favoritos:', this.listaId);
      },
      (error)=>{
        console.error('Error al obtener juegos favoritos:', error);
      }
    );
  };
  
 
}

*/
}