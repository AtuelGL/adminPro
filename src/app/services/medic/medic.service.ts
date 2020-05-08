import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Medic } from '../../models/medic.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  totalMedics: number = 0;

  constructor(
    public http: HttpClient,
    public _userService: UserService
    ) { }


    getMedics(){
      let url = URL_SERVICES + '/medic';
      return this.http.get(url)
      .pipe(map((resp: any) => {
          this.totalMedics = resp.total;
          return resp.medics;
      }));
    }

    deleteMedic(id: string){
      let url = URL_SERVICES + '/medic/' + id;
      url += '?token=' + this._userService.token;
      return this.http.delete(url)
      .pipe(map((resp: any) => {
        swal('Medico eliminado', 'Se ha eliminado el medico correctamente', 'success');
        return true;
      }));
    }

    saveMedic(medic: Medic){
      let url = URL_SERVICES + '/medic';

      if (medic._id){
        url += '/' + medic._id;
        url += '?token=' + this._userService.token;
        return this.http.put(url,medic)
        .pipe(map((resp: any) => {
          swal('Medico actualizado', medic.name, 'success');
          return resp.medic;
        }));
      }else{
        url += '?token=' + this._userService.token;
        return this.http.post(url, medic)
        .pipe(map((resp: any) => {
          swal('Medico creado', medic.name, 'success');
          return resp.medic;
        }));
      }
    }

  getMedicById(id: string){
    let url = URL_SERVICES + '/medic/' +id;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.medic));
  }

    searchMedic(key: string){
      let url = URL_SERVICES + '/search/collection/medic/' + key;
      return this.http.get(url)
      .pipe(map((resp: any) => resp.medic));
    }
}
