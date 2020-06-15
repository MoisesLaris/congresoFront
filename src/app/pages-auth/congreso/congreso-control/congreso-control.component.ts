import { Component, OnInit,ViewChild } from '@angular/core';
import { CongresoService } from '../../../services/congreso.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { CongresoModule } from '../congreso.module';

@Component({
  selector: 'app-congreso-control',
  templateUrl: './congreso-control.component.html',
  styles: []
})
export class CongresoControlComponent implements OnInit {
  rows = [];
  temp = [];
  selected = [];

  columns = [
    { prop: 'id' },
    { name: 'nombre' }
  ];

  tableLoaded = false;

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  recoveryArray_congress: CongresoModule[] = [];

  @ViewChild('myModal') myModal;
  modalRef;
  
  constructor(
    private router: Router,
    private congressService: CongresoService,
    private modalService: ModalManager,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fnGetAllCongress();
  }

  fnGetAllCongress(){
    this.tableLoaded = false;
    this.congressService.fnGetAllCongress()
    .then((res)=>{

      console.log(res);
      this.recoveryArray_congress = res;
      this.fnLoadTable();
    
    })
    .catch((rej)=>{
      console.log(rej);    
    });
  }

  fnLoadTable(): void {
    let anyArray_data: any[] = [];
    this.recoveryArray_congress.forEach(obj => {
      let any_transformObj = this.fnTransformObj(obj, ['nombre']);
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
    console.log(id);
    this.router.navigate(['/system/congress/edit',id]);
  }

  fnDelete(){
    console.log(this.idEliminar);
    this.congressService.fnPostDeleteCongress(this.idEliminar)
    .then((res) => {
      this.toastr.success(res);
      this.fnGetAllCongress();
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
}
