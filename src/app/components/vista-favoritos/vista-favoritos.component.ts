import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Route } from '@angular/router';
import { FavoritosService } from 'src/app/favoritos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-favoritos',
  templateUrl: './vista-favoritos.component.html',
  styleUrls: ['./vista-favoritos.component.css']
})
export class VistaFavoritosComponent {

  juegos: any = " ";
  listaId: Array<number> = [];
  idUsuario: any = "";


  constructor(private api: ApiService, private route: ActivatedRoute, private servicio: FavoritosService){}



  async ngOnInit(){
    this.idUsuario = localStorage.getItem('idUsuario');
    
    console.log("funcion juegos api: ");

    this.obtenerJuegosFavoritos();



    try {

      
      let juegosAux: Array<any> = [];
      if (this.listaId)
      {
        this.juegos = await this.api.filtrarPlataforma('all');
        let i:number = 0;
        this.juegos.forEach((juego: any) => {
          this.listaId.forEach((juegoFavorito: any)=>{
            if(juego.id == juegoFavorito.idJuego)
            {
              juegosAux.push(juego);
              console.log(juego);
            }
          })
        });
        this.juegos = juegosAux;
        console.log(this.juegos);
      }
      else
      {
        let respuesta = document.createElement('p');
        respuesta.innerHTML = "Todavia no has agregado ningun juego a tu lista de favoritos";
      }
    } catch (error) {
      console.log(error);
    }
  }


  obtenerJuegosFavoritos(){
    this.servicio.obtenerJuegosFavoritos(this.idUsuario).subscribe(
      (resultado)=>{
        this.listaId = resultado;
        console.log('Juegos favoritos:', this.listaId);
      },
      (error)=>{
        console.error('Error al obtener juegos favoritos:', error);
      }
    );
  };


  eliminarJuego(id: number){
    this.idUsuario = localStorage.getItem('idUsuario');
    console.log(id);
    console.log(this.idUsuario);
    this.listaId = this.listaId.filter(idBorrar => idBorrar != id);
    this.servicio.eliminarJuegoFavorito(this.idUsuario, id).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        Swal.fire({
          icon: 'success',
          text: 'Juego eliminado de favoritos correctamente'
        })
        this.ngOnInit();
      },
      error => {
        console.error('Error al enviar IDs al servidor:', error);
        console.error('Mensaje de error del servidor:', error.message);
        Swal.fire({
          icon: 'error',
          text: 'Error al eliminar juego de favoritos.'
        });
        this.ngOnInit();
      }
    );
    
    this.ngOnInit();
  }

  ngOnDestroy(){
    console.log(this.listaId);


  }
}
