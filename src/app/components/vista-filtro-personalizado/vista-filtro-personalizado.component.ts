import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vista-filtro-personalizado',
  templateUrl: './vista-filtro-personalizado.component.html',
  styleUrls: ['./vista-filtro-personalizado.component.css']
})
export class VistaFiltroPersonalizadoComponent {

  constructor(private api: ApiService, private route: ActivatedRoute){}

  platform: string = "All";
  orderBy: string = "None";
  genre: string = "None";

  juegos: any;

  generos: Array<string> = ['MMORPG', 'Shooter', 'Strategy', 'MOBA', 'Racing', 'Sports', 'Social', 'Sandbox', 'Open-world',
   'Survival', 'PVP', 'PVE', 'Pixel', 'Voxel', 'Zombie', 'Turn-based', 'First-person','Third-person', 'Top-down', 'Tank', 
   'Space', 'Sailing', 'Side-scroller', 'Superhero', 'Permadeath', 'Card', 'Battle-royale', 'MMO', 'MMOFPS', 'MMOTPS', '3D', '2D',
    'Anime', 'Fantasy', 'Sci-fi', 'Fighting', 'Action-RPG', 'Action', 'Military', 'Martial-arts', 'Flight', 'Low-spec', 'Tower-defense',
     'Horror', 'MMORTS'];
  plataformas: Array<string> = ['All', 'PC', 'Browser'];
  sorts: Array<string> = ['Alphabetical','Release-date', 'Relevance', 'Popularity'];

  async ngOnInit(){
    try {
      this.juegos = await this.api.filtrarPlataforma(this.platform.toLowerCase());
    } catch (error) {
      console.log(error);
    }
  }

  async buscar(){
    try {
      if(this.genre == "None")
      {
        this.genre = " ";
      }
      if(this.orderBy == "None")
      {
        this.orderBy = " ";
      }
      console.log(this.genre,this.platform, this.orderBy);
      this.juegos = await this.api.ordenarPersonalizado(this.genre.toLowerCase(), this.platform.toLowerCase(), this.orderBy.toLowerCase());
    } catch (error) {
      console.log(error);
    }
  }

  actualizarGenero(genero: string): void{
    this.genre = genero;
  }

  actualizarPlataforma(plataforma: string): void{
    this.platform = plataforma;
  }

  actualizarOrden(orden: string): void{
    this.orderBy = orden;
  }

}
