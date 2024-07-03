
import { Component } from '@angular/core';
import { AuthUService } from 'src/app/services/auth-u.service';

@Component({
  selector: 'app-btn-profile',
  templateUrl: './btn-profile.component.html',
  styleUrls: ['./btn-profile.component.css']
})
export class BtnProfileComponent{
  isLoggedIn = false;
  
constructor(private authUService: AuthUService){
  
}

ngOnInit() {
  this.authUService.authStatus$.subscribe(isAuth =>{
    this.isLoggedIn = isAuth;
  });
}

}
