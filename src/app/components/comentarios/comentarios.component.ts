import { Component } from '@angular/core';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent {

  comentario = {
    autor:  'gen',
    mensaje: '',
    fechaPublicacion: '',
    puntaje: 0
  };

  listaPuntajes:  Array<number>=[1,2,3,4,5]
  mensajeActual: string = "";

  puntajePromedio: number = 0;

  listaComentarios: Array<ComentariosComponent["comentario"]> = [];

  ngOnInit(){
    this.promPuntaje();
  }

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
    this.comentario.fechaPublicacion = new Date().toLocaleString();
    this.listaComentarios.push(Object.assign({}, this.comentario));
    this.ngOnInit();
  }
}
