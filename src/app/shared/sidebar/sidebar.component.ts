import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from 'src/app/services/service.index';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  user: User;
/* tslint:disable: variable-name */
  constructor(
    public _sidebar: SidebarService,
    public _userService: UserService
    ) { }
/* tslint:enable */
  ngOnInit(): void {
    this.user = this._userService.user;
    this._sidebar.loadMenu();
  }

}
