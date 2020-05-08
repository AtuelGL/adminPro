import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file/upload-file.service';
import { ModalUploadService } from './modal-upload.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  uploadImage: File;
  tempImg: string | ArrayBuffer;

  constructor(
    public _uploadFileService: UploadFileService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {

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


  uploadImg(){
    this._uploadFileService.uploadFile(this.uploadImage, this._modalUploadService.type, this._modalUploadService.id)
    .then(resp => {
      this._modalUploadService.notification.emit(resp);
      this.closeModal();
    })
    .catch(err => {
      console.log('Error en la carga');
    });
  }

  closeModal(){
    this.tempImg = null;
    this.uploadImage = null;
    this._modalUploadService.hiddenModal();
  }

}
