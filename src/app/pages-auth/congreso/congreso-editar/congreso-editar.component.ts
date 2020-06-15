import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CongresoService } from 'src/app/services/congreso.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { CareerModel } from 'src/app/models/career.model';
import { CareerService } from 'src/app/services/career.service';
import { CongressModel } from '../../../models/congress.model';


@Component({
  selector: 'app-congreso-editar',
  templateUrl: './congreso-editar.component.html',
  styles: []
})
export class CongresoEditarComponent implements OnInit {

  idCongress;
  arrayCareers:CareerModel[] = [];


  editCongressForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required]),
    idCarrera: new FormControl(null, Validators.required)
  });
  
  constructor(
    private route: ActivatedRoute,
    private congressService: CongresoService,
    private careerService: CareerService,
    private toasr: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.idCongress = this.route.snapshot.params.id;
    this.fnGetCongressById();
    this.fnGetAllCareers();
  }


  fnGetAllCareers(){
    this.careerService.fnGetAllCareers()
    .then(res => {
      console.log(res);
      this.arrayCareers = res;
    })
    .catch(err => {
    })
  }
  fnGetCongressById(){
    this.congressService.fnGetCongressById(this.idCongress)
    .then((res:CongressModel) => {
      console.log(res);
      this.fnLoadData(res);
    })
    .catch((err)=>{
      this.toasr.error(err);
    })
  }

  fnLoadData(obj:CongressModel){
    this.editCongressForm.setValue({
      nombre: obj.nombre,
      idCarrera: obj.idCarrera
    })
  }

  goBack(){
    this.location.back();
  }
  onSubmit(){
    let data = this.editCongressForm.value;
    
    this.congressService.fnPostEditCongress(this.idCongress,data)
    .then(res => {
      this.toasr.success(res);
      this.location.back();
    })
    .catch(err=> {
      this.toasr.error(err);
    })
  }

}
