import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthUService } from './services/auth-u.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(private api: ApiService, private authUService: AuthUService){}
  title = 'tp-final-angular';
  generos: Array<string> = ['MMORPG', 'Shooter', 'Strategy', 'MOBA', 'Racing', 'Sports', 'Social', 'Sandbox', 'Open-world',
   'Survival', 'PVP', 'PVE', 'Pixel', 'Voxel', 'Zombie', 'Turn-based', 'First-person','Third-person', 'Top-down', 'Tank', 
   'Space', 'Sailing', 'Side-scroller', 'Superhero', 'Permadeath', 'Card', 'Battle-royale', 'MMO', 'MMOFPS', 'MMOTPS', '3D', '2D',
    'Anime', 'Fantasy', 'Sci-fi', 'Fighting', 'Action-RPG', 'Action', 'Military', 'Martial-arts', 'Flight', 'Low-spec', 'Tower-defense',
     'Horror', 'MMORTS'];
  plataformas: Array<string> = ['All', 'PC', 'Browser'];
  sorts: Array<string> = ['Alphabetical','Release-date', 'Relevance', 'Popularity'];

  buscar = document.getElementById("buscar") as HTMLAnchorElement;
  busqueda: string = "";

  ngOnInit() {
    
  }

}

  

