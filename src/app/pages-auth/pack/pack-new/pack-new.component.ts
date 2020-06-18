import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CongressModel } from 'src/app/models/congress.model';
import { CongresoService } from 'src/app/services/congreso.service';
import { PackageService } from 'src/app/services/package.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pack-new',
  templateUrl: './pack-new.component.html',
  styleUrls: ['./pack-new.component.css']
})
export class PackNewComponent implements OnInit {

  newPackForm = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    descripcion: new FormControl(null, Validators.required),
    precio: new FormControl(null, Validators.required),
    idCongreso: new FormControl(null, Validators.required),
  });
  
  
  arrayCongreso:CongressModel[] = [];

  constructor(
    private location: Location,
    private congressService: CongresoService,
    private packageService: PackageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fnGetAllCongress();
  }


  fnGetAllCongress() {
    this.congressService.fnGetAllCongress()
    .then(res => {
      this.arrayCongreso = res;
      this.newPackForm.patchValue({
        idCongreso: this.arrayCongreso[0]._id
      })
    })
    .catch(() => {

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
    let data = this.newPackForm.value;
    console.log(data);
    this.packageService.PostNewPackage(data)
    .then(res => {
      this.toastr.success(res);
      this.newPackForm.reset();
      this.newPackForm.patchValue({
        idCarrera: this.arrayCongreso[0]._id
      });
    })
    .catch(err => {
      this.toastr.error(err);
    })
  }
}
