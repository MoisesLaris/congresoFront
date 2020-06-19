import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CongressModel } from 'src/app/models/congress.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalManager } from 'ngb-modal';
import { CongresoService } from 'src/app/services/congreso.service';
import { PackageModel } from 'src/app/models/package.model';
import { PackageService } from '../../../services/package.service';

@Component({
  selector: 'app-pack-control',
  templateUrl: './pack-control.component.html',
  styleUrls: ['./pack-control.component.css']
})
export class PackControlComponent implements OnInit {

  congresoSelected = -1;


  rows = [];
  temp = [];
  selected = [];

  columns = [
    { prop: 'id' },
    { name: 'nombre' },
    { name: 'descripcion' },
    { name: 'precio' }
  ];

  tableLoaded = true;

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  recoveryArray_congress: CongressModel[] = [];
  recoveryArray_package: PackageModel[] = [];

  @ViewChild('myModal') myModal;
  modalRef;

  constructor(
    private router: Router,
    private congressService: CongresoService,
    private packageService: PackageService,
    private modalService: ModalManager,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fnGetAllCongress();
  }

  fnGetAllCongress(){
    this.congressService.fnGetAllCongress()
    .then(res => {
      this.recoveryArray_congress = res;
    })
    .catch(()=>{});
  }

  fnGetAllPackageByCongress(){
    this.tableLoaded = false;
    console.log(this.congresoSelected);
    this.packageService.fnGetPackageByCongress(this.congresoSelected)
    .then((res)=>{
      this.recoveryArray_package = res;
      console.log(res);
      this.fnLoadTable();
    })
    .catch((rej)=>{
      console.log(rej);    
    });
  }

  fnLoadTable(): void {
    let anyArray_data: any[] = [];
    this.recoveryArray_package.forEach(obj => {
      let any_transformObj = this.fnTransformObj(obj, ['nombre','descripcion','precio']);
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

  fnEdit(id){
    this.router.navigate(['/system/package/edit',id]);
  }

  fnDelete(){
    console.log(this.idEliminar);
    this.packageService.fnPostDeletePackage(this.idEliminar)
    .then((res) => {
      this.toastr.success(res);
      this.fnGetAllPackageByCongress();
    })
    .catch((err) => {
      this.toastr.error(err);
    });
    this.modalService.close(this.modalRef);
  }
  
  idEliminar;

  openModal(id){
    this.idEliminar = id;
    this.modalRef = this.modalService.open(this.myModal, {
        size: "md",
        modalClass: 'mymodal',
        hideCloseButton: false,
        centered: false,
        backdrop: false,
        animation: true,
        keyboard: false,
        closeOnOutsideClick: true,
        backdropClass: "modal-backdrop"
    })
}
closeModal(){
    this.modalService.close(this.modalRef);
    //or this.modalRef.close();
}

fnChangeCongress(){
  this.fnGetAllPackageByCongress();
}

}
