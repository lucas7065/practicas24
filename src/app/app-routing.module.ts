import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { vistaJuegoComponent } from './components/juego/vistaJuego.component';
import { VistaFiltroComponent } from './components/vista-filtro/vista-filtro.component';

const routes: Routes = [
  {path: 'viewGame/:id', component: vistaJuegoComponent},
  {path: 'filter/:parametro/:case', component: VistaFiltroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
