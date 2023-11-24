import { Component, Input, SimpleChange } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-vista-filtro',
  templateUrl: './vista-filtro.component.html',
  styleUrls: ['./vista-filtro.component.css']
})
export class VistaFiltroComponent {

  constructor(private api: ApiService, private route: ActivatedRoute){} 

  @Input() plataforma: string = " ";
  @Input() genero: string = " ";
  @Input() sort: string = " ";

  @Input() busqueda: string = " ";

  juegos: any = " ";

  async ngOnInit() {
      try {
        this.route.params.subscribe(async (params: any)=>{
          if(params.busqueda)
          {
            this.busqueda = params.busqueda;
            this.buscarJuegos();
          }
        });
        if(this.busqueda == " ")
        {
          this.route.params.subscribe(async (params: any)=>{
            if(params.plataforma)
            {
              this.plataforma = params.plataforma;
              this.juegos = await this.api.ordenarPersonalizado(this.genero, this.plataforma, this.sort);
            }
          });
          this.route.params.subscribe(async (params: any)=>{
              if(params.genre)
              {
                this.genero = params.genre;
                this.juegos = await this.api.ordenarPersonalizado(this.genero, this.plataforma, this.sort);
              }
          });
          this.route.params.subscribe(async (params: any)=>{
            if(params.sort)
            {
              this.sort = params.sort;
              this.juegos = await this.api.ordenarJuegos(this.sort);
            }
          });
          this.juegos = await this.api.ordenarPersonalizado(this.genero, this.plataforma, this.sort);
        }
      } catch (error) {
        console.log("Ocurrio un error", error);
      }
    }

    async buscarJuegos(){
      let todos = await this.api.filtrarPlataforma("all");
      let juegosAux = new Array<any>;
      todos.forEach((juego: (any)) => {
      if(juego.title.toLowerCase().includes(this.busqueda.toLocaleLowerCase()))
      {
        juegosAux.push(juego);
      }
      });
      if(juegosAux.length == 0)
      {
        document.getElementById("miniatura")?.setAttribute('hidden', 'true');
      }
      else
      {
        this.juegos = juegosAux;
      }
    }
    
  }



