import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CareerService } from 'src/app/services/career.service';
import { CareerModel } from 'src/app/models/career.model';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styles: []
})
export class UserNewComponent implements OnInit {

  newUserForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required]),
    apellidos: new FormControl(null, [Validators.required]),
    semestre: new FormControl(null, [Validators.required]),
    grupo: new FormControl(null, [Validators.required,Validators.maxLength(1)]),
    correo: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required]),
    tipoUsuario: new FormControl(1, Validators.required),
    idCarrera: new FormControl(null, Validators.required)
  });

  arrayCareers: CareerModel[] = [];
  
  constructor(
    private location: Location,
    private userService: UserService,
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

      this.newUserForm.patchValue({
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
    let data = this.newUserForm.value;
    console.log(data);
    this.userService.fnPostNewUser(data)
    .then(res => {
      this.toastr.success(res);
      this.newUserForm.reset();
      this.newUserForm.patchValue({
        tipoUsuario: 1,
        idCarrera: this.arrayCareers[0]._id
      });
    })
    .catch(err => {
      this.toastr.error(err);
    })
  }

}
