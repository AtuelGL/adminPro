import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupName } from '@angular/forms';
import swal from 'sweetalert';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    public _userService: UserService,
    public router: Router
  ) { }

  areIqual(item1: string, item2: string){
    return (group: FormGroup) => {
      const pass1 = group.controls[item1].value;
      const pass2 = group.controls[item2].value;
      if (pass1 === pass2){
        return null;
      }
      return {
          areIqual: true
      };
    };
  }

  ngOnInit(): void {
    init_plugins();

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      passwd: new FormControl(null, Validators.required),
      passwd2: new FormControl(null, Validators.required),
      conditions: new FormControl(false),
    }, {validators: this.areIqual('passwd','passwd2') });


    this.form.setValue({
      name: 'Test ',
      email: 'test@TestBed.com',
      passwd: '123456',
      passwd2: '123456',
      conditions: true
      });


  }

 registerUser(){
    if (this.form.invalid){
      return;
    }
    if ( !this.form.value.conditions ){
      swal('importante', 'Debe de aceptar las condiciones!', 'warning');
    }

    let user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.passwd,
    );

    this._userService.createUser(user)
    .subscribe(resp => this.router.navigate(['/login']));
}
}
