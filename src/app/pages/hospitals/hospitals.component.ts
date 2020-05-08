import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { HospitalService } from 'src/app/services/service.index';

declare var swal: any

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  totalReg: number = 0;
  loading: boolean = true;


  constructor( 
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
    ) {}

  ngOnInit(): void {
    this.getHospitals();

    this._modalUploadService.notification
    .subscribe(() => this.getHospitals());
  }

  updateImg(id: string){
    this._modalUploadService.visibleModal('hospitals', id);
  }

  getHospitals(){
    this.loading = true;
    this._hospitalService.getHospitals()
    .subscribe(hospitals => {
      this.totalReg = this._hospitalService.totalHospitals;
      this.hospitals = hospitals;
      this.loading = false;
    });
  }

  searchHospital(key: string){
    if  (key.length <= 0 ){
      this.getHospitals();
      return
    }
    this.loading = true;
    this._hospitalService.searchHospital(key)
    .subscribe(hospitals => {
      this.hospitals = hospitals;
      this.loading = false;
    });
  }

  deleteHospital(hospital: Hospital){  
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de eliminar al hospital ' + hospital.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( del => {
      if (del){
        this._hospitalService.deleteHospital(hospital._id)
        .subscribe(deleted => {
          this.getHospitals();
        });
      }
    });
  }

  saveHospital(hospital: Hospital){
    this._hospitalService.updateHospital(hospital)
    .subscribe();
  }

  createHospital(){
    swal({
      title: "Nuevo Hospital",
      text: "Ingrese nombre:",
      content: "input",
      buttons: true
    }).then((inputValue) => {
      if (inputValue === false) return false;
      if (inputValue === "" || inputValue.length === 0) {
        swal.showInputError("Es necesario un nombre");
        return false
      }
      this._hospitalService.createHospital(inputValue)
      .subscribe(() => this.getHospitals());
    });
  }
}
