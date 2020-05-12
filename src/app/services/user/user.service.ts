import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadFileService: UploadFileService
    ) {
    this.loadStorage();
   }

  renewToken(){
    let url = URL_SERVICES + '/login/renewtoken';
    url += '?token=' + this.token;

    return this.http.get(url)
    .pipe(map((resp: any) => {
      this.token = resp.token;
      localStorage.setItem('token', this.token);
      return true;
    }))
    .pipe(catchError(err => {
      this.router.navigate(['/login']);
      swal('No se pudo renovar token', 'No fue posible renovar Token', 'error');
      return throwError(err);
    }));
    
   }

  logOut(){
    this.user = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  isLogin(){
    return (this.token.length > 5) ? true : false;
  }

  saveStorage(id: string, token: string, user: User, menu: any){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  loadStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }else{
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  googleLogin(token: string){
    let url = URL_SERVICES + '/login/google';
    return this.http.post(url, {token})
    .pipe(map((resp: any) => {this.saveStorage(resp.id, resp.token, resp.user, resp.menu);
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
    .pipe(map((resp: any) => {
      this.saveStorage(resp.id, resp.token, resp.user, resp.menu);
      return true;
    }))
    .pipe(catchError(err => {
      swal('Error en el Login', err.error.message, 'error');
      return throwError(err);
    }));
  }

  createUser(user: User){
  let url = URL_SERVICES + '/user';
  return this.http.post(url, user)
    .pipe(map((resp: any) => {
      swal('Usuario creado', user.email, 'success');
      return resp.user;
  }))
  .pipe(catchError(err => {
    swal(err.error.message, err.error.errors.message, 'error');
    return throwError(err);
  }));
  }

  updateUser(user: User){
  let url = URL_SERVICES + '/user/' + user._id;
  url += '?token=' + this.token;
  return this.http.put(url, user)
    .pipe(map((resp: any) => {
      if(user._id === this.user._id){
        this.saveStorage(resp.user._id, this.token, resp.user, this.menu);
      }
      swal('Usuario actualizado', user.name, 'success');
      return true;
  }))
  .pipe(catchError(err => {
    swal(err.error.message, err.error.errors.message, 'error');
    return throwError(err);
  }));
  }

  changeImage(file: File, id: string){
   this._uploadFileService.uploadFile(file, 'users', id)
   .then((resp: any) => {
    console.log(resp);
    this.user.img = resp.user.img;
    swal('Imagen actualizada', this.user.name, 'success');
    this.saveStorage(id, this.token, this.user, this.menu);
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
