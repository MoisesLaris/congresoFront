import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styles: []
})
export class UserControlComponent implements OnInit {


  rows = [];
  temp = [];
  selected = [];

  columns = [
    { prop: 'nombre' },
    { name: 'apellidos' },
    { name: 'correo' },
    { name: 'id' }
  ];

  tableLoaded = false;

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  recoveryArray_users: UserModel[] = [];

  @ViewChild('myModal') myModal;
  modalRef;
  
  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: ModalManager,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fnGetAllUsers();
  }

  fnGetAllUsers(){
    this.tableLoaded = false;
    this.userService.fnGetAllUsers()
    .then((res)=>{

      console.log(res);
      this.recoveryArray_users = res;
      this.fnLoadTable();
    
    })
    .catch((rej)=>{
      console.log(rej);    
    });
  }

  fnLoadTable(): void {
    let anyArray_data: any[] = [];
    this.recoveryArray_users.forEach(obj => {
      let any_transformObj = this.fnTransformObj(obj, ['nombre', 'apellidos','correo']);
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
    this.router.navigate(['/system/user/edit',id]);
  }

  fnDelete(){
    console.log(this.empleadoEliminar);
    this.userService.fnPostDeleteUser(this.empleadoEliminar)
    .then((res) => {
      this.toastr.success(res);
      this.fnGetAllUsers();
    })
    .catch((err) => {
      this.toastr.error(err);
    });
    this.modalService.close(this.modalRef);
  }
  
  empleadoEliminar;

  openModal(id){
    this.empleadoEliminar = id;
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
