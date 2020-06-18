import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CongresoService } from 'src/app/services/congreso.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CongressModel } from 'src/app/models/congress.model';
import { PackageService } from 'src/app/services/package.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pack-edit',
  templateUrl: './pack-edit.component.html',
  styleUrls: ['./pack-edit.component.css']
})
export class PackEditComponent implements OnInit {

  editPackForm = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    descripcion: new FormControl(null, Validators.required),
    precio: new FormControl(null, Validators.required),
    idCongreso: new FormControl(null, Validators.required),
  });

  arrayCongreso:CongressModel[] = [];

  idEdit;

  constructor(
    private location: Location,
    private congressService: CongresoService,
    private packageService: PackageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fnGetAllCongress();
    this.fnGetPackageById();
  }

  fnGetPackageById() {
    this.packageService.fnGetPackageById(this.idEdit)
    .then(res => {
      this.toastr.success(res);
    })
    .catch(err => {
      this.toastr.error(err);
    })
  }

  fnGetAllCongress() {
    this.congressService.fnGetAllCongress()
    .then(res => {
      this.arrayCongreso = res;
    })
    .catch(() => {

    })
  }
  fnLoadData(obj:CongressModel){
    this.editPackForm.setValue({
      nombre: obj.nombre,
      idCarrera: obj.idCarrera,
      fechaInicio: new Date(obj.fechaInicio).toISOString().substring(0,10),
      fechaFin: new Date(obj.fechaFin).toISOString().substring(0,10)
    })
  }

  numberOnly(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  goBack(){
    this.location.back();
  }
  onSubmit(){
    let data = this.editPackForm.value;
    
    this.packageService.fnPostEditPackage(this.idEdit,data)
    .then(res => {
      this.toastr.success(res);
      this.location.back();
    })
    .catch(err=> {
      this.toastr.error(err);
    })
  }
}
