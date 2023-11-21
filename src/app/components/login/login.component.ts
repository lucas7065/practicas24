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
    // Lógica para manejar el envío del formulario, por ejemplo, enviar datos al servidor
    console.log('Formulario enviado:', this.email, this.password);

    // Crear un objeto con las credenciales para enviar al servidor
    const usuario = {
      email: this.email,
      password: this.password
    };

    // Realizar la llamada a la API con Axios
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
        // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario
      });
  }

  login(){
    const user = {email:this.email, password: this.password};
    this.userService.login(user).subscribe((data)=>{
      console.log(data);
    });
  }
}