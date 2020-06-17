import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CareerModel } from 'src/app/models/career.model';
import { CongresoService } from 'src/app/services/congreso.service';
import { CareerService } from 'src/app/services/career.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { CongressModel } from 'src/app/models/congress.model';

@Component({
  selector: 'app-congreso-nuevo',
  templateUrl: './congreso-nuevo.component.html',
  styles: []
})
export class CongresoNuevoComponent implements OnInit {

  newCongressForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required]),
    idCarrera: new FormControl(null, Validators.required),
    fechaInicio: new FormControl(null, Validators.required),
    fechaFin: new FormControl(null, Validators.required)
  });

  arrayCareers: CareerModel[] = [];
  
  constructor(
    private location: Location,
    private congressService: CongresoService,
    private careerService: CareerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fnGetAllCareers();
  }

  fnGetAllCareers(){
    this.careerService.fnGetAllCareers()
    .then(res => {
      console.log(res);
      this.arrayCareers = res;
      this.newCongressForm.patchValue({
        idCarrera: this.arrayCareers[0]._id
      })
    })
    .catch(err => {
    })
  }
  goBack(){
    this.location.back();
  }

  numberOnly(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  letterOnly(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (!(charCode >= 65 && charCode <=120) && (charCode !=32 && charCode != 0)) {
      return false;
    }
    return true;
  }

  onSubmit(){
    let data: CongressModel = this.newCongressForm.value;
    let fechainicio = new Date(data.fechaInicio);
    let fechafin = new Date(data.fechaFin);
    if(fechainicio >= fechafin){
      this.toastr.error("La fecha inicio debe ser menor a fecha fin");
      return;
    }
    console.log(data);
    this.congressService.fnPostNewCongress(data)
    .then(res => {
      this.toastr.success(res);
      this.newCongressForm.reset();
      this.newCongressForm.patchValue({
        tipoUsuario: 1,
        idCarrera: this.arrayCareers[0]._id
      });
    })
    .catch(err => {
      this.toastr.error(err);
    })
  }

}
