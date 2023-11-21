import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-vista-favoritos',
  templateUrl: './vista-favoritos.component.html',
  styleUrls: ['./vista-favoritos.component.css']
})
export class VistaFavoritosComponent {

  constructor(private api: ApiService, private route: ActivatedRoute){}

  juegos: any = " ";
  listaId: Array<number> = [516,2,1,4];

  async ngOnInit(){
    try {
      this.juegos = await this.api.filtrarPlataforma('all');
      let juegosAux: Array<any> = [];
      console.log(this.listaId);
      if (this.listaId)
      {
        let i:number = 0;
        this.juegos.forEach((juego: any) => {
          while(i < this.listaId.length)
          {
            if(juego.id == this.listaId[i])
            {
              juegosAux.push(juego);
              console.log(juego);
            }
            i++;
          }
          i = 0;
        });
        this.juegos = juegosAux;
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

  eliminarJuego(id: number){
    this.listaId = this.listaId.filter(idBorrar => idBorrar != id);
    this.ngOnInit();
  }

  ngOnDestroy(){
    //Aca se actualizaria la lista de ids de la bdd
  }
}
