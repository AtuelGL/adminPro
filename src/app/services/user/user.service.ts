import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
    ) {
    this.loadStorage();
   }

   logOut(){
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
   }

  isLogin(){
    return (this.token.length > 5) ? true : false;
  }

  saveStorage(id: string, token: string, user: User){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  loadStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    }else{
      this.token = '';
      this.user = null;
    }
  }

  googleLogin(token: string){
    let url = URL_SERVICES + '/login/google';
    return this.http.post(url, {token})
    .pipe(map((resp: any) => {this.saveStorage(resp.id, resp.token, resp.user);
                              return true;
    }));
  }



  login(user: User, rememberMe: boolean){
    if (rememberMe){
      localStorage.setItem('email', user.email);
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICES + '/login';
    return this.http.post(url, user)
    .pipe(map((resp: any) => {this.saveStorage(resp.id, resp.token, resp.user);
                              return true;
    }));
  }

  createUser(user: User){
  let url = URL_SERVICES + '/user';
  return this.http.post(url, user)
    .pipe(map((resp: any) => {
      swal('Usuario creado', user.email, 'success');
      return resp.user;
  }));
  }
}
