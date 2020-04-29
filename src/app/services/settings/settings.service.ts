import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  setting: Setting = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };
/* tslint:disable: variable-name */
  constructor(  @Inject(DOCUMENT) private _document, ) {
/* tslint:enable */
    this.getSetting();
  }

  setSetting(){
    localStorage.setItem('setting', JSON.stringify(this.setting) );
  }

  getSetting(){
    if ( localStorage.getItem('setting') ){
      this.setting = JSON.parse(localStorage.getItem('setting'));

      this.applyTheme( this.setting.theme );
    }else {
      this.applyTheme( this.setting.theme );
    }
  }

  applyTheme( theme: string ){
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url );

    this.setting.theme = theme;
    this.setting.themeUrl = url;

    this.setSetting();
  }

}

interface Setting{
  themeUrl: string;
  theme: string;
}
