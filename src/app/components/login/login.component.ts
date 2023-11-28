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
    password: "",
    nombre: ""
  };



  constructor(public userService: UsersService, private router:Router){}

  ngOnInit(){
    
  }


  onSubmit(): void {
    axios.post('http://localhost:3000/api/login', this.usuario)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
  
        if (response.status === 200) {
          console.log('Respuesta del servidor:', response.data);
  
          // Agregar la información al local storage
          localStorage.setItem('idUsuario', response.data.idUsuario);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('nombre', response.data.nombre);
          localStorage.setItem('apellido', response.data.apellido);
          console.log("LOGGED");

          if(localStorage){
            document.getElementById("login")?.setAttribute("hidden", "true");
            let container = document.getElementById("perfil-usuario-container") as HTMLAnchorElement;
            container.style.display = "flex";
          }

          
        } else {
          // Si las credenciales son inválidas, mostrar un alert
          alert('Credenciales inválidas. Por favor, verifica tu correo y contraseña.');
          console.error('Credenciales inválidas. Código de estado:', response.status);
        }
      })
      .catch(error => {
        console.error('Error al hacer la llamada:', error);
      });

  }

}

