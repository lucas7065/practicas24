import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BtnJugarComponent } from './components/btn-jugar/btn-jugar.component';
import { vistaJuegoComponent } from './components/juego/vistaJuego.component';
import { InfoMargenComponent } from './components/info-margen/info-margen.component';
import { DescJuegoComponent } from './components/desc-juego/desc-juego.component';
import { VistaFiltroComponent } from './components/vista-filtro/vista-filtro.component';
import { MiniaturaComponent } from './components/miniatura/miniatura.component';

@NgModule({
  declarations: [
    AppComponent,
    BtnJugarComponent,
    vistaJuegoComponent,
    InfoMargenComponent,
    DescJuegoComponent,
    VistaFiltroComponent,
    MiniaturaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
