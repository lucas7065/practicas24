import { Component } from "@angular/core";
import axios from "axios";
import { UsersService } from "src/app/users/users.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})

export class LoginComponent {
  email = '';
  password = '';

  constructor(public userService: UsersService){}


  onSubmit(): void {
    console.log('Formulario enviado:', this.email, this.password);

    const usuario = {
      email: this.email,
      password: this.password
    };

    axios.post('http://localhost:3000/login', usuario)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        
        if(response.data.message){
          console.log("Inicio de sesion exitoso");
        }else{
          console.log("Inicio de sesion fallido: ", response.data.error);
        }
      })
      .catch(error => {
        console.error('Error al hacer la llamada:', error);
      
      });
  }
  
  login(){
    console.log(this.email);
    console.log(this.password)
  }
  
}