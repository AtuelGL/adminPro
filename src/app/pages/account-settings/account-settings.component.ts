import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document ) { }

  ngOnInit(): void {
  }

  changeStyle( style: string, link: any ) {
    
    this.applyCheck(link);
    const url = `assets/css/colors/${style}.css`;
    this._document.getElementById('theme').setAttribute('href', url );
  }

  applyCheck(link: any) {
    const selectors: any = document.getElementsByClassName('selector');
    for ( const ref of selectors ) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

}
