import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;

  constructor(private router: Router,
    private authService: AuthService,
    private ValidateService:ValidateService,
    private flashmessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    const user = {
      name:this.name,
      email:this.email,
      username:this.username,
      password:this.password
    }
    //require all fields
    if(!this.ValidateService.validateRegister(user)){
      this.flashmessage.show('Please fill in all fields',{cssClass:'alert-danger',timeout:3000})
      return false;
    }
    //validate email
    if(!this.ValidateService.validateEmail(user.email)){
      this.flashmessage.show('Please fill correct email',{cssClass:'alert-danger',timeout:3000})
      return false;
    }
    //register user
    this.authService.registerUser(user).subscribe(data=>{
      if(data.success){
        this.flashmessage.show('You just registered successfully',{cssClass:'alert-success',timeout:3000})
        this.router.navigate(['/login']);
      }else{
        this.flashmessage.show('Something went wrong',{cssClass:'alert-danger',timeout:3000})
        this.router.navigate(['/register']);
      }
    });

  }
}
