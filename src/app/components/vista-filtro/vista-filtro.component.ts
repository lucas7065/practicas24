import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vista-filtro',
  templateUrl: './vista-filtro.component.html',
  styleUrls: ['./vista-filtro.component.css']
})
export class VistaFiltroComponent {

  constructor(private api: ApiService, private route: ActivatedRoute){ }

  @Input() plataforma: string = " ";
  @Input() genero: string = " ";
  @Input() sort: string = " ";

  juegos: any;

  async ngOnInit() {
    try {
      this.plataforma = this.route.snapshot.params['plataforma'] ?? " ";
      this.genero = this.route.snapshot.params['genre'] ?? " ";
      this.sort = this.route.snapshot.params['sort'] ?? " ";
      if(this.plataforma != " ")
      {
        if(this.genero != " ")
        {
          this.juegos = await this.api.obtenerDatos (`https://www.freetogame.com/api/filter?tag=${this.genero}&platform=${this.plataforma}`);
        } else
        {
          this.juegos = await this.api.filtrarPlataforma(this.plataforma);
        }
      } else if (this.genero != " ")
      {
        this.juegos = await this.api.filtrarGenero(this.genero);
      }else if(this.sort != " ")
      {
        this.juegos = await this.api.ordenarJuegos(this.sort);
      }
    } catch (error) {
      console.log("Ocurrio un error", error);
    }
  }

}
