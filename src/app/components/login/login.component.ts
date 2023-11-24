import { Component } from '@angular/core';
import axios from 'axios';
import { UsersService } from 'src/app/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})

export class LoginComponent {
    usuario = {
    email: "",
    password: ""
  };



  constructor(public userService: UsersService, private router:Router){}


  onSubmit(): void {
    console.log('Formulario enviado:', this.usuario);

    axios.post('http://localhost:3000/api/login', this.usuario)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        
        if (response.status === 200) {
          console.log('Respuesta del servidor:', response.data);
          
          // Agregar la información al local storage
          localStorage.setItem('miDatos', JSON.stringify(response.data));
          console.log("LOGGED");
          this.router.navigate(["/miperfil"]);
        } else {
          console.error('Error en la respuesta del servidor. Código de estado:', response.status);
          throw new Error('Error en la respuesta del servidor.');
        }
      })
      .catch(error => {
        console.error('Error al hacer la llamada:', error);
      
      });
  }
}
