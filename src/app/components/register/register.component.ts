import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { UsersService } from 'src/app/users/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  usuario = {
    nombre: '',
    apellido: '',
    email: '',
    password: ''
}

constructor(public userService: UsersService){}


onSubmit():void {
  // Lógica para manejar el envío del formulario, por ejemplo, enviar datos al servidor
  console.log('Formulario enviado:', this.usuario);

  // Realizar la llamada a la API con Axios
  axios.post('http://localhost:3000/validar', this.usuario)
    .then(response => {
      console.log('Respuesta del servidor:', response.data);
      // Puedes manejar la respuesta del servidor aquí
    })
    .catch(error => {
      console.error('Error al hacer la llamada:', error);
      // Puedes manejar el error aquí
    });
}


register() {
  const user = {nombre: this.usuario.nombre, apellido: this.usuario.apellido ,email: this.usuario.email, password: this.usuario.password};
  if(!user.apellido || !user.nombre || !user.email){

  }
  
  
  this.userService.register(user).subscribe((data)=>{
    console.log(data);
  })  
}

}