import { Component, OnInit } from '@angular/core';
import { CongresoService } from 'src/app/services/congreso.service';
import { PackageService } from 'src/app/services/package.service';
import { CongressModel } from 'src/app/models/congress.model';
import { PackageModel } from 'src/app/models/package.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-new',
  templateUrl: './payment-new.component.html',
  styles: []
})
export class PaymentNewComponent implements OnInit {

  recoveryArray_users: UserModel[] = [];
  recoveryArray_package: PackageModel[] = [];
  recoveryArray_congress: CongressModel[] = [];

  congresoSelected = -1;
  packageSelected: any = -1;


  newPaymentForm = new FormGroup({
    idUsuario: new FormControl(null, [Validators.required]),
    cantidad: new FormControl(null, [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });


  constructor(
    private packageService: PackageService,
    private userService: UserService,
    private congressService: CongresoService,
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.fnGetAllCongress();
    this.fnGetAllUsers();
  }

  fnGetAllCongress(){
    this.congressService.fnGetAllCongress()
    .then(res => {
      this.recoveryArray_congress = res;
    })
    .catch(() => {});
  }

  fnGetAllPackage(){
    this.packageService.fnGetPackageByCongress(this.congresoSelected)
    .then(res => {
      this.recoveryArray_package = res;
    })
  }
  
  fnGetAllUsers() {
    this.userService.fnGetAllUsers()
    .then(res => {
      this.recoveryArray_users = res;
    })
  }

  goBack(){
    this.location.back();
  }
  onSubmit(){
    let data = this.newPaymentForm.value;
    console.log(data);
    if(data.cantidad > this.paquete.precio ){
      this.toastr.error("Se debe pagar el monto de $" + this.paquete.precio + " o menor");
    }
    data.idTipoPago = this.packageSelected;
    
    this.paymentService.fnPostNewPayment(data)
    .then(res => {
      this.toastr.success(res);
      this.congresoSelected = -1;
      this.packageSelected = -1;
      this.newPaymentForm.reset();
      this.newPaymentForm.patchValue({status: true});
      this.enableInput = false;
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


  fnChangeCongress(){
    this.packageSelected = -1;
    this.enableInput = false;
    this.fnGetAllPackage();
  }

  enableInput = false;
  paquete: PackageModel;
  fnChangePackage(){
    if(this.packageSelected == -1){
      return;
    }
    this.enableInput = true;
    this.recoveryArray_package.forEach(obj => {
      if(obj._id == this.packageSelected){
        this.paquete = obj;
      }
    })
  }
}
