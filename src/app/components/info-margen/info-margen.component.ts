import { Component, Input, OnInit } from '@angular/core';
import { PerfilUsuarioComponent } from '../perfil-usuario/perfil-usuario.component';

@Component({
  selector: 'app-info-margen',
  templateUrl: './info-margen.component.html',
  styleUrls: ['./info-margen.component.css']
})
export class InfoMargenComponent {

  @Input() titulo: string = " ";
  @Input() miniatura: string = " ";
  @Input() url: string = " ";
  @Input() id: number = 0;
  @Input() distribuidor: string = " ";

  ngOnInit(){
  }

  agregarFavorito(){
    var idUsuario = localStorage.getItem("email");
    console.log(idUsuario);
  }

  

}
