import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUService } from 'src/app/services/auth-u.service';
import Swal from 'sweetalert2';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})

export class LoginComponent implements OnInit{
    user = {
      idUsuario: '',
      email: "",
      password: "",
      nombre: "",
      apellido: ""
  };


  constructor(private authUService: AuthUService, private router: Router){}


  ngOnInit(){}

  logIn(){
    this.authUService.login(this.user).subscribe( (res:any)  =>{
      if(res.token && res.idUsuario){
        localStorage.setItem('token', res.token);
        localStorage.setItem('idUsuario', res.idUsuario);
        localStorage.setItem('token', res.token); 
        this.authUService.setAuthStatus(true);
        this.router.navigate(['miperfil']);
      } else{
        console.error('Credenciales inválidas. Código de estado:', res.status);
      }

      
    }, error =>{
      Swal.fire({
        title:"Credenciales invalidas",
        text: "Email o contraseña incorrectos.",
        icon: "error"
      });
      console.error('Login error: ', error);
    });
  }


  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    this.authUService.setAuthStatus(false);
  }

  isAuth(){
    this.authUService.isAuth();
  }


/*
  onLogin(){
    this.authService.login(this.usuario.email, this.usuario.password).subscribe(reponse =>{
      if (reponse.success){
        this.router.navigate(['/']);
      } else {
        // manejar error de auth
      }
    });
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

*/


  

}
