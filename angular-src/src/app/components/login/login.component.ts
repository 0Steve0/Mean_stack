import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  constructor(
    private authService:AuthService,
    private flashmessage:FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe(data=>{
      if(data.success){
        var token = 'JWT'+' '+data.token.substring(3);//add a space bewtween them
        this.authService.storeUserData(token,data.user);
        this.flashmessage.show('Successfully Login!',{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/dashboard']);
      }else{
        this.flashmessage.show(data.msg,{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/login']);
      }
    });
  }

}
