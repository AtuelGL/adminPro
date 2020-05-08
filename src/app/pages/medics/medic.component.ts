import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, MedicService } from 'src/app/services/service.index';
import { Medic } from '../../models/medic.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: [
  ]
})
export class MedicComponent implements OnInit {

  hospitals: Hospital[] = [];
  medic: Medic = new Medic('', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _hospitalService: HospitalService,
    public _medicService: MedicService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
     let id = params['id'];
     if(id!== 'new'){
       this.getMedic(id);
     }
    })
  }

  ngOnInit(): void {
    this._hospitalService.getHospitals()
    .subscribe(hospitals => this.hospitals = hospitals);
    this._modalUploadService.notification
    .subscribe(resp => {
      this.medic.img = resp.medic.img;
    });
  }

  saveMedic(f: NgForm){
    if (f.invalid){
      return;
    }
    this._medicService.saveMedic(this.medic)
    .subscribe(medic => {
      this.medic._id = medic._id;
      this.router.navigate(['/medic', medic._id]);
    });
  }

  changeHospital(id){
    this._hospitalService.getHospitalsById(id)
    .subscribe(hospital => this.hospital = hospital)
  }

  getMedic(id: string){
    this._medicService.getMedicById(id)
    .subscribe(medic => {
      this.medic = medic
      this.medic.hospital = medic.hospital._id;
      this.changeHospital(this.medic.hospital)
    });
  }

  changeImg(){
    this._modalUploadService.visibleModal('medics', this.medic._id);
  }
}
