import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-info-margen',
  templateUrl: './info-margen.component.html',
  styleUrls: ['./info-margen.component.css']
})
export class InfoMargenComponent {

  @Input() titulo: string = " ";
  @Input() miniatura: string = " ";
  @Input() url: string = " ";

  ngOnInit(){
  }

}
