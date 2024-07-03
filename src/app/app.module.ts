import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BtnJugarComponent } from './components/btn-jugar/btn-jugar.component';
import { vistaJuegoComponent } from './components/juego/vistaJuego.component';
import { InfoMargenComponent } from './components/info-margen/info-margen.component';
import { DescJuegoComponent } from './components/desc-juego/desc-juego.component';
import { VistaFiltroComponent } from './components/vista-filtro/vista-filtro.component';
import { MiniaturaComponent } from './components/miniatura/miniatura.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MiniaturaFavoritosComponent } from './components/miniatura-favoritos/miniatura-favoritos.component';
import { VistaFavoritosComponent } from './components/vista-favoritos/vista-favoritos.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { VistaFiltroPersonalizadoComponent } from './components/vista-filtro-personalizado/vista-filtro-personalizado.component';
import { BtnProfileComponent } from './components/btn-profile/btn-profile.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { PrivateComponent } from './components/private/private.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './services/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    BtnJugarComponent,
    vistaJuegoComponent,
    InfoMargenComponent,
    DescJuegoComponent,
    VistaFiltroComponent,
    MiniaturaComponent,
    HomePageComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    MiniaturaFavoritosComponent,
    VistaFavoritosComponent,
    PerfilUsuarioComponent,
    VistaFiltroPersonalizadoComponent,
    BtnProfileComponent,
    ComentariosComponent,
    PrivateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    // jwt
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    // token interceptor
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
