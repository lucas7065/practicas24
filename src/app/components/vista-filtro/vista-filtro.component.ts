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

  @Input() parametro: string = " ";
  @Input() case: number = 0;

  juegos: any;

  async ngOnInit() {
    try {
      this.parametro = this.route.snapshot.params['parametro'];
      this.case = this.route.snapshot.params['case'];
      if(this.case == 1)
      {
        console.log("genero");
        const data = await this.api.filtrarGenero(this.parametro);
        this.juegos = data;
        console.log(this.juegos);
      }
      else if(this.case == 2)
      {
        console.log("plataforma");
        const data = await this.api.filtrarPlataforma(this.parametro);
        this.juegos = data;
        console.log(this.juegos);
      }
      else
      {
        throw new Error("Error al filtrar juegos");
      } 
    } catch (error) {
      console.log("Ocurrio un error", error);
    }
  }

}
