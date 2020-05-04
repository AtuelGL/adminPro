import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpClient
  ) { }

  login(user: User, rememberMe: boolean){
    if (rememberMe){
      localStorage.setItem('email', user.email);
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICES + '/login';
    return this.http.post(url, user)
    .pipe(map((resp: any) => {
      localStorage.setItem('id', resp.id);
      localStorage.setItem('token', resp.token);
      localStorage.setItem('user', JSON.stringify(resp.user));

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
