import { Component, Input , OnInit} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vista-juego',
  templateUrl: './vistaJuego.component.html',
  styleUrls: ['./vistaJuego.component.css']
})
export class vistaJuegoComponent {

  
  constructor(private api: ApiService, private route: ActivatedRoute){ }

  @Input() id: number = 0;
  @Input() genero: string = " ";

  juego: any;
  juegosRecomendados: any;

  async ngOnInit(){
    try {
      this.route.params.subscribe(async (params: any) => {
        if(params.id)
        {
          this.id = params.id;
          this.juego = await this.api.descripcionJuego(this.id);
          this.juegosRecomendados = await this.api.filtrarGenero(this.juego.genre.toLocaleLowerCase());
          this.juegosRecomendados = this.juegosRecomendados.filter((recomendado: any) => recomendado.title != this.juego.title).slice(0,5);
    }
  });
    } catch (error) {
      console.log("Ocurrio un error", error);
}
  }
  }

