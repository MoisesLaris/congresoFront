import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CareerService } from 'src/app/services/career.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { CareerModel } from 'src/app/models/career.model';

@Component({
  selector: 'app-career-edit',
  templateUrl: './career-edit.component.html',
  styleUrls: ['./career-edit.component.css']
})
export class CareerEditComponent implements OnInit {

  idCareer;


  editCareerForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required]),
    centro: new FormControl(null, Validators.required)
  });
  
  constructor(
    private route: ActivatedRoute,
    private careerService: CareerService,
    private toasr: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.idCareer = this.route.snapshot.params.id;
    this.fnGetUserById();
  }

  fnGetUserById(){
    this.careerService.fnGetCareerById(this.idCareer)
    .then((res:CareerModel) => {
      console.log(res);
      this.fnLoadData(res);
    })
    .catch((err)=>{
      this.toasr.error(err);
    })
  }

  fnLoadData(obj:CareerModel){
    this.editCareerForm.setValue({
      nombre: obj.nombre,
      centro: obj.centro
    })
  }

  goBack(){
    this.location.back();
  }
  onSubmit(){
    let data = this.editCareerForm.value;
    
    this.careerService.fnPostEditCarrer(this.idCareer,data)
    .then(res => {
      this.toasr.success(res);
      this.location.back();
    })
    .catch(err=> {
      this.toasr.error(err);
    })
  }

}
