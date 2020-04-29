import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'dashboard', url: '/dashboard' },
        { title: 'progress', url: '/progress' },
        { title: 'Graficos', url: '/graficas1' },
      ]
    }
  ];

  constructor() { }
}
