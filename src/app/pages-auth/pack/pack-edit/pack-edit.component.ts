import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CongresoService } from 'src/app/services/congreso.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CongressModel } from 'src/app/models/congress.model';
import { PackageService } from 'src/app/services/package.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { PackageModel } from '../../../models/package.model';

@Component({
  selector: 'app-pack-edit',
  templateUrl: './pack-edit.component.html',
  styleUrls: ['./pack-edit.component.css']
})
export class PackEditComponent implements OnInit {

  idPackage;
  arrayCongress: CongressModel[] = [];


  editPackageForm = new FormGroup({
    nombre: new FormControl(null, [Validators.required]),
    idCongreso: new FormControl(null, Validators.required),
    descripcion: new FormControl(null, Validators.required),
    precio: new FormControl(null, Validators.required)
  });
  
  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService,
    private congressService: CongresoService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.idPackage = this.route.snapshot.params.id;
    this.fnGetPackageById();
    this.fnGetAllCongress();
  }


  fnGetAllCongress(){
    this.congressService.fnGetAllCongress()
    .then(res => {
      this.arrayCongress = res;
    })
    .catch(err => {
    })
  }
  fnGetPackageById(){
    console.log(this.idPackage);
    this.packageService.fnGetPackageById(this.idPackage)
    .then((res:PackageModel) => {
      console.log(res);
      this.fnLoadData(res);
    })
    .catch((err)=>{
      this.toastr.error(err);
    })
  }

  fnLoadData(obj:PackageModel){
    this.editPackageForm.setValue({
      nombre: obj.nombre,
      idCongreso: obj.idCongreso,
      descripcion: obj.descripcion,
      precio: obj.precio

    })
  }

  
  goBack(){
    this.location.back();
  }
  onSubmit(){
    let data = this.editPackageForm.value;
    
    this.packageService.fnPostEditPackage(this.idPackage,data)
    .then(res => {
      this.toastr.success(res);
      this.location.back();
    })
    .catch(err=> {
      this.toastr.error(err);
    })
  }
}
