import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements OnInit {
  email: string;
  rememberMe: boolean = false;

  constructor(public router: Router,
              public _userService: UserService
              ) { }

  ngOnInit(): void {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1){
      this.rememberMe =true;
    }
  }

  login( form: NgForm ){
    if (form.invalid){
    return;
  }
    let user = new User(null, form.value.email, form.value.passwd);

    this._userService.login(user, form.value.rememberMe)
                   .subscribe( correct => this.router.navigate(['/dashboard']));

    // this.router.navigate(['/dashboard']);
  }

}
