import { Component , Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-desc-juego',
  templateUrl: './desc-juego.component.html',
  styleUrls: ['./desc-juego.component.css']
})
export class DescJuegoComponent {

  @Input() descripcionJuego: string = " ";
  @Input() requisitosMinimos: any;
  @Input() genero: string = " ";
  @Input() desarrollador: string = " ";
  @Input() distribuidor: string = " ";
  @Input() fechaLanzamiento: string = " ";
  @Input() plataforma: string = " ";
  
  ngOnInit(): void{
    if(this.plataforma == "Web Browser")
    {
      let requisitos = document.getElementById("contenedorRequisitos") as HTMLAnchorElement;
      requisitos.setAttribute("hidden","true");
    }  
  }

}
