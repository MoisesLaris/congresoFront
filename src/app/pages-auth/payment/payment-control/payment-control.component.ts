import { Component, OnInit, ViewChild } from '@angular/core';
import { CongresoService } from 'src/app/services/congreso.service';
import { CongressModel } from 'src/app/models/congress.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { PackageService } from 'src/app/services/package.service';
import { PackageModel } from 'src/app/models/package.model';
import { PaymentService } from 'src/app/services/payment.service';
import { PaymentModel } from 'src/app/models/payment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-control',
  templateUrl: './payment-control.component.html',
  styles: []
})
export class PaymentControlComponent implements OnInit {
  congresoSelected = -1;
  packageSelected = -1;

  
  recoveryArray_congress: CongressModel[] = [];
  recoveryArray_package: PackageModel[] = [];
  recoveryArray_payment: PaymentModel[] = [];

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  tableLoaded = true;


  rows = [];
  temp = [];
  selected = [];

  columns = [
    { prop: 'id' },
    { name: 'cantidad' },
    { name: 'idUsuario' },
    { name: 'idTipoPago'}
  ];

  constructor(
    private congressService: CongresoService,
    private packageService: PackageService,
    private paymentService: PaymentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fnGetAllCongress();
  }
  
  fnGetAllCongress(){
    this.congressService.fnGetAllCongress()
    .then(res => {
      this.recoveryArray_congress = res;
    })
    .catch(() => {});
  }

  fnGetPackageByIdCongress(){
    this.packageService.fnGetPackageByCongress(this.congresoSelected)
    .then(res => {
      this.recoveryArray_package = res;
    })
  }

  objCheck = {};

  fnGetPaymentByPackage(){
    this.tableLoaded = false;
    this.paymentService.fnGetPaymentByPackage(this.packageSelected)
    .then(res => {
      this.recoveryArray_payment = res;
      this.recoveryArray_payment.forEach( obj => {
        if(obj.cantidad < obj.idTipoPago.precio){
          this.objCheck[obj._id] = {
            disabled: false
          }
        }else{
          this.objCheck[obj._id] = {
            disabled: true
          }
        }
      });
      this.fnLoadTable();
    })
    .catch(() => {})
  }

  fnChangeCongress(){
    this.packageSelected = -1;
    this.fnGetPackageByIdCongress();
  }

  fnChangePackage(){
    this.fnGetPaymentByPackage();
  }


  fnEdit(idPago, idUsuario, idPaquete){
    this.router.navigate(['/system/payment/edit/',idUsuario, idPaquete, idPago]);
  }

  fnLoadTable(): void {
    let anyArray_data: any[] = [];
    this.recoveryArray_payment.forEach(obj => {
      let any_transformObj = this.fnTransformObj(obj, ['cantidad', 'nombre', 'idUsuario', 'idTipoPago']);
      anyArray_data.push(any_transformObj);
    });
    this.temp = [...anyArray_data];
    this.rows = anyArray_data;

    this.tableLoaded = true;
  }

  fnTransformObj(obj: any, filterColumns: string[]): any {
    let any_objAux: any = {};
    Object.keys(obj).forEach(key => {
      
      let newKey;
      if (key[0] == '_') {
        newKey = key.replace('_', '');
        any_objAux[newKey] = obj[key];
      }
      any_objAux[key] = obj[key];
    });
    let filter;
    filterColumns.forEach(key => {
      if (!filter) {
        filter = obj[key];
      } else {
        filter = filter + ' ' + obj[key]
      }
    });
    any_objAux['filter'] = filter;
    return any_objAux;
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.filter.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }
}
