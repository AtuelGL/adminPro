import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public type: string;
  public id: string;

  public hidden: string = 'hidden';

  public notification = new EventEmitter<any>();

  constructor() { }

  hiddenModal(){
    this.hidden = 'hidden';
    this.id = null;
    this.type = null;
  }

  visibleModal(type: string, id: string){
    this.hidden = '' ;
    this.id = id;
    this.type = type;
  }
}
