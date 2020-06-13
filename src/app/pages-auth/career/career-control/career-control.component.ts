import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CareerModel } from 'src/app/models/career.model';
import { Router } from '@angular/router';
import { CareerService } from 'src/app/services/career.service';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-career-control',
  templateUrl: './career-control.component.html',
  styleUrls: ['./career-control.component.css']
})
export class CareerControlComponent implements OnInit {

  rows = [];
  temp = [];
  selected = [];

  columns = [
    { prop: 'id' },
    { name: 'nombre' },
    { name: 'centro' },
  ];

  tableLoaded = false;

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  recoveryArray_careers: CareerModel[] = [];

  @ViewChild('myModal') myModal;
  modalRef;

  constructor(
    private router: Router,
    private careerService: CareerService,
    private modalService: ModalManager,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fnGetAllCareers();
  }

  fnGetAllCareers(){
    this.tableLoaded = false;
    this.careerService.fnGetAllCareers()
    .then((res)=>{

      console.log(res);
      this.recoveryArray_careers = res;
      this.fnLoadTable();
    
    })
    .catch((rej)=>{
      console.log(rej);    
    });
  }

  fnLoadTable(): void {
    let anyArray_data: any[] = [];
    this.recoveryArray_careers.forEach(obj => {
      let any_transformObj = this.fnTransformObj(obj, ['nombre', 'centro']);
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
    this.router.navigate(['/system/career/edit',id]);
  }

  fnDelete(){
    console.log(this.idEliminar);
    this.careerService.fnPostDeleteCareer(this.idEliminar)
    .then((res) => {
      this.toastr.success(res);
      this.fnGetAllCareers();
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
