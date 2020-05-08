import { Component, OnInit } from '@angular/core';
import { Medic } from '../../models/medic.model';
import { MedicService } from '../../services/medic/medic.service';

declare var swal: any;


@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: [
  ]
})
export class MedicsComponent implements OnInit {

  medics: Medic[] = [];
  loading: boolean = true;
  totalReg: number = 0;

  constructor(
    public _medicService: MedicService
  ) { }

  ngOnInit(): void {
    this.getMedic();
  }

  // updateImg(id: string){
  //   this._modalUploadService.visibleModal('hospitals', id);
  // }

  getMedic(){
    this.loading = true;
    this._medicService.getMedics()
    .subscribe(hospitals => {
      this.totalReg = this._medicService.totalMedics;
      this.medics = hospitals;
      this.loading = false;
    });
  }

  searchMedic(key: string){
    if  (key.length <= 0 ){
      this.getMedic();
      return
    }
    this.loading = true;
    this._medicService.searchMedic(key)
    .subscribe(medics => {
      this.medics = medics;
      this.loading = false;
    });
  }

  deleteMedic(medic: Medic){
    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de eliminar al medico ' + medic.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( del => {
      if (del){
        this._medicService.deleteMedic(medic._id)
        .subscribe(() => {
          this.getMedic();
        });
      }
    });
  }

  // saveHospital(hospital: Hospital){
  //   this._hospitalService.updateHospital(hospital)
  //   .subscribe();
  // }

  // createMedic(){
  //   swal({
  //     title: "Nuevo Hospital",
  //     text: "Ingrese nombre:",
  //     content: "input",
  //     buttons: true
  //   }).then((inputValue) => {
  //     if (inputValue === false) return false;
  //     if (inputValue === "" || inputValue.length === 0) {
  //       swal.showInputError("Es necesario un nombre");
  //       return false
  //     }
  //     this._hospitalService.createHospital(inputValue)
  //     .subscribe(() => this.getHospitals());
  //   });
}