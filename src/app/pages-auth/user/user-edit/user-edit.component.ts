import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: []
})
export class UserEditComponent implements OnInit {

  idUser;


  editUserForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required]),
    apellidos: new FormControl(null, [Validators.required]),
    semestre: new FormControl(null, [Validators.required, Validators.maxLength(1)]),
    grupo: new FormControl(null, [Validators.required,Validators.maxLength(1)]),
    tipoUsuario: new FormControl(null, Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toasr: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.idUser = this.route.snapshot.params.id;
    this.fnGetUserById();
  }

  fnGetUserById(){
    this.userService.fnGetUserById(this.idUser)
    .then((res:UserModel) => {
      console.log(res);
      this.fnLoadData(res);
    })
    .catch((err)=>{
      this.toasr.error(err);
    })
  }

  fnLoadData(obj:UserModel){
    this.editUserForm.setValue({
      nombre: obj.nombre,
      apellidos: obj.apellidos,
      semestre: obj.semestre,
      grupo: obj.grupo,
      tipoUsuario: obj.tipoUsuario
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

  onSubmit(){
    let data = this.editUserForm.value;
    
    this.userService.fnPostEditUser(this.idUser,data)
    .then(res => {
      this.toasr.success(res);
      this.location.back();
    })
    .catch(err=> {
      this.toasr.error(err);
    })
  }

}
