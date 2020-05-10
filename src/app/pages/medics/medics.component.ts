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

  getMedic(){
    this.loading = true;
    this._medicService.getMedics()
    .subscribe(medics => {
      this.totalReg = this._medicService.totalMedics;
      this.medics = medics;
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
}
