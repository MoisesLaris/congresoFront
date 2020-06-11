import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styles: []
})
export class NewUserComponent implements OnInit {

  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  focus6;

 

  newUserForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required]),
    apellidos: new FormControl(null, [Validators.required]),
    semestre: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
    grupo: new FormControl(null, [Validators.required,Validators.maxLength(1)]),
    correo: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null, [Validators.required]),
    passwordVerify: new FormControl(null, Validators.required)
  })

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.newUserForm.value);
    console.log(this.newUserForm);
    let data = this.newUserForm.value;
    if(this.newUserForm.get('password').value != this.newUserForm.get('passwordVerify').value){
      this.toastr.error("Las contraseñas deben ser iguales");
      return;
    }
    this.loginService.fnPostNewUser(data)
    .then((res) => {
      this.toastr.success(res);
    })
    .catch(err => {
      this.toastr.error(err);
    })
    
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
  goBack(){
    this.location.back();
  }

 

}
