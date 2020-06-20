import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from 'src/app/services/package.service';
import { PackageModel } from 'src/app/models/package.model';
import { Location } from '@angular/common';
import { PaymentService } from 'src/app/services/payment.service';
import { PaymentModel } from 'src/app/models/payment.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styles: []
})
export class PaymentEditComponent implements OnInit {

  editPaymentForm = new FormGroup({
    cantidad: new FormControl(null, [Validators.required]),
    status: new FormControl(true, [Validators.required]),
  });
  

  idusuario;
  idpaquete;
  idpago;
  paquete: PackageModel;
  pago: PaymentModel;


  pagado;

  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService,
    private paymentService: PaymentService,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap);
    this.idusuario = this.route.snapshot.params.usuario;
    this.idpaquete = this.route.snapshot.params.paquete;
    this.idpago = this.route.snapshot.params.pago;
    console.log(this.idpaquete);
    this.fnGetPackageById();
    this.fnGetPaymentById();
  }



  fnGetPaymentById(){
    this.paymentService.fnGetPaymentById(this.idpago)
    .then(res => {
      this.pago = res;
      this.pagado = this.pago.cantidad;
    })
    .catch(()=> {});

  }


  fnGetPackageById(){
    this.packageService.fnGetPackageById(this.idpaquete)
    .then(res => {
      this.paquete = res;
      console.log(this.paquete);
    })
    .catch(() => {});
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

  onSubmit(){
    let data = this.editPaymentForm.value;
    let pagado:any = Number(this.pagado) + Number(data.cantidad);
    console.log(pagado);
    if(pagado > this.paquete.precio){
      this.toastr.error("El total pagado no debe superar $" + this.paquete.precio);
      return;
    }
    data.cantidad = pagado;
    data.idUsuario = this.idusuario;
    data.idTipoPago = this.idpaquete;
      
    this.paymentService.fnPostEditPayment(data,this.idpago)
    .then(res => {
      this.toastr.success(res);
      this.location.back();
    })
    .catch(err => {
      this.toastr.error(err);
    })

  }

}
