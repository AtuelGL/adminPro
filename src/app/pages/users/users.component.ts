import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;
  totalReg: number = 0;
  loading: boolean = true;


  constructor( 
    public _userService: UserService,
    public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit(): void {
    this.getUsers();

    this._modalUploadService.notification
    .subscribe(resp => this.getUsers());
  }

  viewModal(id: string){
    this._modalUploadService.visibleModal('users', id);
  }

  getUsers(){
    this.loading = true;
    this._userService.getUsers(this.from)
    .subscribe((resp: any) => {
      this.totalReg = resp.total;
      this.users = resp.users;
      this.loading = false;
    });
  }

  changeFrom(value: number){
    let from = this.from + value;
    if ( from >= this.totalReg){
      return;
    }
    if ( from < 0){
      return;
    }
    this.from += value;
    this.getUsers();
  }

  searchUser(key: string){
    if  (key.length <=0 ){
      this.getUsers();
      return
    }
    this.loading = true;
    this._userService.searchUser(key)
    .subscribe((users: User[]) => {
      this.users = users;
      this.loading = false;
    });
  }

  deleteUser(user: User){
    if (user._id === this._userService.user._id){
      swal('Imposible borrar usuario', 'No puede eliminarse usted mismo', 'error');
      return;
    }
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de eliminar al usuario ' + user.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( del => {
      if (del){
        this._userService.deleteUser(user._id)
        .subscribe(deleted => {
          this.from = 0;
          this.getUsers();
        });
      }
    })
  }

  saveUser(user: User){
    this._userService.updateUser(user)
    .subscribe();
  }
}
