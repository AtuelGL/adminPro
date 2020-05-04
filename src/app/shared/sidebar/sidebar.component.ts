import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
/* tslint:disable: variable-name */
  constructor( 
    public _sidebar: SidebarService,
    public _userService: UserService
    ) { }
/* tslint:enable */
  ngOnInit(): void {
  }

}
