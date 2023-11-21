import { Component, Input , OnInit} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
  constructor(private api: ApiService, private route: ActivatedRoute){}

  juegosPopulares: any;
  juegosRecienAnadidos: any;

  async ngOnInit(){
    try {
      this.juegosPopulares = await this.api.ordenarJuegos("popularity");
      this.juegosPopulares = this.juegosPopulares.slice(0,10);
      this.juegosRecienAnadidos = await this.api.ordenarJuegos("release-date");
      this.juegosRecienAnadidos = this.juegosRecienAnadidos.slice(0,10);
    } catch (error) {
      
    }
  }
}




