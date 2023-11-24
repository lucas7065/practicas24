import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { vistaJuegoComponent } from './components/juego/vistaJuego.component';
import { VistaFiltroComponent } from './components/vista-filtro/vista-filtro.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { MiniaturaFavoritosComponent } from './components/miniatura-favoritos/miniatura-favoritos.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VistaFavoritosComponent } from './components/vista-favoritos/vista-favoritos.component';
import { VistaFiltroPersonalizadoComponent } from './components/vista-filtro-personalizado/vista-filtro-personalizado.component';




const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', pathMatch: 'full', component: HomePageComponent},
  {path: 'viewGame/:id', component: vistaJuegoComponent},
  {path: 'filter', component: VistaFiltroPersonalizadoComponent},
  {path: 'filter/:platform/:genre/:sort', component: VistaFiltroComponent},
  {path: 'filterp/:plataforma', component: VistaFiltroComponent},
  {path: 'filterg/:genre', component: VistaFiltroComponent},
  {path: 'filters/:sort', component: VistaFiltroComponent},
  {path: 'search/:busqueda', component: VistaFiltroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'mygames', component: VistaFavoritosComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
