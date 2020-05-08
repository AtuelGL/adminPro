import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import swal from 'sweetalert';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  user: User;
  totalHospitals: number;

  constructor(
    public http: HttpClient,
    public _userService: UserService
  ) {}

  getHospitals(){
    let url = URL_SERVICES + '/hospital';
    return this.http.get(url)
    .pipe(map((resp: any) => {
        this.totalHospitals = resp.total;
        return resp.hospitals;
    }));
  }

  getHospitalsById(id){
    let url = URL_SERVICES + '/hospitals' + id;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.hospital));
  }

  deleteHospital(id: string){
    let url = URL_SERVICES + '/hospital/' + id;
    url += '?token=' + this._userService.token;

    return this.http.delete(url)
    .pipe(map((resp: any) => {
      swal('Hospital eliminado', 'Se ha eliminado el hospital correctamente', 'success');
      return true;
    }));
  }

  createHospital(name: string){
    let url = URL_SERVICES + '/hospital' + '?token=' + this._userService.token;
    return this.http.post(url, {name})
    .pipe(map((resp: any) => {
      swal('Hospital creado', name, 'success');
      return resp.hospital;
    }));
  }

  updateHospital(hospital: Hospital){
    let url = URL_SERVICES + '/hospital/' + hospital._id;
    url += '?token=' + this._userService.token;
    return this.http.put(url, hospital)
      .pipe(map((resp: any) => {
        swal('Hospital actualizado', hospital.name, 'success');
        return resp.hospital;
    }));
  }

  searchHospital(key: string){
    let url = URL_SERVICES + '/search/collection/hospital/' + key;
    return this.http.get(url)
    .pipe(map((resp: any) => resp.hospital));
  }
}
