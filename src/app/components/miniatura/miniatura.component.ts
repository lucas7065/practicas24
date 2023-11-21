import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-miniatura',
  templateUrl: './miniatura.component.html',
  styleUrls: ['./miniatura.component.css']
})
export class MiniaturaComponent {

  constructor(private route: ActivatedRoute){}

  @Input() imagen: string = " ";
  @Input() descripcion: string = " ";
  @Input() titulo: string = " ";
  @Input() id: number = 0;

  ngOnInit()
  {
  }
  
}
