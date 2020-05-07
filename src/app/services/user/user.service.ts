import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService
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

  updateUser(user: User){
  let url = URL_SERVICES + '/user/' + user._id;
  url += '?token=' + this.token;
  return this.http.put(url, user)
    .pipe(map((resp: any) => {
      if(user._id === this.user._id){
        this.saveStorage(resp.user._id, this.token, resp.user);
      }
      swal('Usuario actualizado', user.name, 'success');
      return true;
  }));
  }

  changeImage(file: File, id: string){
   this._uploadFileService.uploadFile(file, 'users', id)
   .then((resp: any) => {
    console.log(resp);
    this.user.img = resp.user.img;
    swal('Imagen actualizada', this.user.name, 'success');
    this.saveStorage(id, this.token, this.user);
   })
   .catch(resp=>{
    console.error(resp);
   })
  }

  getUsers(from: number){
    let url = URL_SERVICES + '/user?from=' + from;
    return this.http.get(url);
  }

  searchUser(key: string){
    let url = URL_SERVICES + '/search/collection/user/' + key;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.user));
  }

  deleteUser(id: string){
    let url = URL_SERVICES + '/user/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url)
    .pipe(map((resp: any) => {
      swal('Usuario eliminado', 'Se ha eliminado el usuario correctamente', 'success');
      return true;
    }));
  }
}
