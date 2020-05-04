import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements OnInit {
  email: string;
  rememberMe: boolean = false;

  auth2: any;

  constructor(public router: Router,
              public _userService: UserService
              ) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1){
      this.rememberMe =true;
    }
  }

  googleInit(){

    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '299379899513-naombpndgnds6smep4b54jdle4pfsc6o.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
    });

      this.attachSignIn( document.getElementById('btnGoogle' ));
    });

  }

  attachSignIn(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._userService.googleLogin(token)
      .subscribe( correct => window.location.href = '#/dashboard');
    });
  }


  login( form: NgForm ){
    if (form.invalid){
    return;
  }
    let user = new User(null, form.value.email, form.value.passwd);

    this._userService.login(user, form.value.rememberMe)
                   .subscribe( () => this.router.navigate(['/dashboard']));

    // this.router.navigate(['/dashboard']);
  }

}
