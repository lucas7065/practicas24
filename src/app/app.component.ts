import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthUService } from './services/auth-u.service';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  titleNav = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile=true;
  isCollapsed=true;

  isLoggedIn = false;


  constructor(private api: ApiService, private authUService: AuthUService, private observer: BreakpointObserver){}
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
    this.authUService.authStatus$.subscribe(isAuth =>{
      this.isLoggedIn = isAuth;
    });

    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) =>{
      if(screenSize.matches){
        this.isMobile=true;
      } else{
        this.isMobile=false;
      }
    });     
  }

  toggleMenu(){
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed=false;
    } else{
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
}

  

