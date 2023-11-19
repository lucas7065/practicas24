import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { vistaJuegoComponent } from './components/juego/vistaJuego.component';
import { VistaFiltroComponent } from './components/vista-filtro/vista-filtro.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomePageComponent},
  {path: 'viewGame/:id', component: vistaJuegoComponent},
  {path: 'filterp/:plataforma', component: VistaFiltroComponent},
  {path: 'filterpg/:plataforma/:genre', component: VistaFiltroComponent},
  {path: 'filterg/:genre', component: VistaFiltroComponent},
  {path: 'filters/:sort', component: VistaFiltroComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
