import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { AuthUService } from 'src/app/services/auth-u.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  registerForm: FormGroup;
  
  usuario = {
    nombre: '',
    apellido: '',
    email: '',
    password: ''
}

constructor(private servicio: AuthUService, private router:Router, private fb: FormBuilder){
  this.registerForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    apellido: ['', Validators.required]
  });
}

onSubmit(){
  if(this.registerForm.valid){
    this.servicio.register(this.registerForm.value).subscribe((response:any)  =>{
      console.log('User registered', response);
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Registro completo'
      });


    this.servicio.login(this.registerForm.value).subscribe( (res:any) =>{
      if(res.token && res.idUsuario){
        localStorage.setItem('idUsuario', res.idUsuario);
        localStorage.setItem('token', res.token); 
        this.servicio.setAuthStatus(true);
        this.router.navigate(['miperfil']);
      } else{
        console.error('Credenciales inválidas. Código de estado:', res.status);
      }
    });
    }, error =>{
      console.error('Registration error', error);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Email ya registrado'
      });
      this.router.navigate(['login']);
    });
  }else{
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Formulario invalido.'
    });
    console.error('Form is invalid');
  }
}

/*
onSubmit():void {
  // Lógica para manejar el envío del formulario, por ejemplo, enviar datos al servidor
  console.log('Formulario enviado:', this.usuario);

  // Realizar la llamada a la API con Axios
  axios.post('http://localhost:3000/user/register', this.usuario)
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
  if(user.email!=null && user.password!= null && user.nombre!= null && user.apellido!=null){
    this.servicio.register(user).subscribe((data)=>{
    console.log(data);
    // buscar id usuario con el mail
    })  
  }else{
    console.log("Debe completar todos los campos!");
    Swal.fire({
      icon: 'error',
      title: 'Error!'
    })
  }
}
  


  register(){
    this.servicio.register(this.usuario).subscribe( (res:any) =>{
      if(res.token && res.idUsuario){
        localStorage.setItem('idUsuario', res.idUsuario);
        localStorage.setItem('token', res.token);
        this.servicio.setAuthStatus(true);
        this.router.navigate(['miperfil']);
      }else{
        console.error('Credenciales invalidas. Codigo de estado:', res.status);
      }
    }, error =>{
      Swal.fire({
        title: "Credenciales invalidas.",
        text: "Debes completar todos los datos.",
        icon: "error"
      });
      console.error('Register error: ', error);
    });
  }
    */
   
}