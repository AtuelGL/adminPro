import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

/* tslint:disable: variable-name */
  constructor( public _setting: SettingsService ) { }
/* tslint:enable */
  ngOnInit(): void {
    this.persistCheck();
  }

  changeStyle( theme: string, link: any ) {
    this.applyCheck(link);
    this._setting.applyTheme(theme);
  }

  applyCheck(link: any) {
    const selectors: any = document.getElementsByClassName('selector');
    for ( const ref of selectors ) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  persistCheck(){
    const selectors: any = document.getElementsByClassName('selector');
    const theme = this._setting.setting.theme;
    for ( const ref of selectors ) {
      if ( ref.getAttribute('data-theme') === theme ){
        ref.classList.add('working');
      }
    }
  }

}
