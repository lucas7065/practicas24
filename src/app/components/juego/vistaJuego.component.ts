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

  juego: any;

  async ngOnInit() {
    try {
      const data = await this.api.descripcionJuego(this.id);
      this.juego = data;
      console.log(this.juego);
    } catch (error) {
      console.log("Ocurrio un error", error);
    }
    console.log(this.juego.title);
  }
  }

