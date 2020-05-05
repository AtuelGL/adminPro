import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  user: User;
  uploadImage: File;
  tempImg: string | ArrayBuffer;


  constructor(
    public _userService: UserService
  ){
    this.user = this._userService.user;
  }

  ngOnInit(): void {
  }

  save(user: User){
    this.user.name = user.name;
    if (!this.user.google){
    this.user.email = user.email;
    }
    this._userService.updateUser(this.user)
    .subscribe();
  }

  selectImage(file: File){
    if (!file){
      this.uploadImage = null;
      return
    }
    if (file.type.indexOf('image') < 0) {
      swal('Sólo imágenes!', 'El archivo seleccionado no es una imagen', 'error');
      this.uploadImage = null;
      return
    }
    this.uploadImage = file;
    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(file);
    reader.onloadend = () => this.tempImg = reader.result;
  }

  changeImage(){
    this._userService.changeImage(this.uploadImage, this.user._id);
  }
}
