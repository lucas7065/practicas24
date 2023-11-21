import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-miniatura-favoritos',
  templateUrl: './miniatura-favoritos.component.html',
  styleUrls: ['./miniatura-favoritos.component.css']
})
export class MiniaturaFavoritosComponent {

  @Input() imagen: string = " ";
  @Input() descripcion: string = " ";
  @Input() titulo: string = " ";
  @Input() id: number = 0;
}
