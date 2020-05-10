import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { User } from 'src/app/models/user.model';
import { Medic } from '../../models/medic.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  medics: Medic[] = [];
  hospitals: Hospital[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params
    .subscribe(params => {
      let key = params.key;
      this.search(key);
    });
  }

  ngOnInit(): void {
  }

  search(key: string){
    let url = URL_SERVICES + '/search/all/' + key;
    this.http.get(url)
    .subscribe( (resp: any) => {
      this.hospitals = resp.Hospitals;
      this.medics = resp.Medics;
      this.users = resp.Users;
      console.log(this.hospitals);
    });
  };


}
