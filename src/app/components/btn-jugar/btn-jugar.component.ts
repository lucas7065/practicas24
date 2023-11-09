import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-jugar',
  templateUrl: './btn-jugar.component.html',
  styleUrls: ['./btn-jugar.component.css']
})
export class BtnJugarComponent {

  @Input() url: string = " ";

  constructor() {
  }

  ngOnInit(): void{
    let btn = document.getElementById("btnJugar") as HTMLAnchorElement;
    if (btn !== null) {
      btn.href = this.url;
    }
  }
}
