import { Component, OnInit, ViewChild } from '@angular/core';
import { CongresoService } from 'src/app/services/congreso.service';
import { CongressModel } from 'src/app/models/congress.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserModel } from 'src/app/models/user.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UserService } from 'src/app/services/user.service';
import { AssistanceService } from 'src/app/services/assistance.service';
import { AssistanceModel } from 'src/app/models/assistance.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assistance-control',
  templateUrl: './assistance-control.component.html',
  styles: []
})
export class AssistanceControlComponent implements OnInit {

  recoveryArray_users: UserModel[] = [];

  tableLoaded = false;

  rows = [];
  temp = [];
  selected = [];

  columns = [
    { prop: 'id' },
    { name: 'nombre' },
    { name: 'apellidos'},
    { name: 'correo'},
    { name: 'semestre'},
    { name: 'grupo'}
  ];


  congressSelected = -1;
  activitySelected = -1;

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;



  constructor(
    private route: ActivatedRoute,
    private congressService: CongresoService,
    private assistanceService: AssistanceService,
    private userService: UserService,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.congressSelected = this.route.snapshot.params.congreso;
    this.activitySelected = this.route.snapshot.params.actividad;
    this.fnGetAllUsers();
  }
  checkList = {};
  fnGetAllUsers(){
    this.userService.fnGetAllUsers()
    .then(res => {
      this.recoveryArray_users = res;
      this.recoveryArray_users.forEach(obj => {
        this.checkList[obj._id]={
          check: 0 //0-nada 1-loading 2-success 
        }
      });
      console.log(this.checkList);
      this.fnLoadTable();
    })
  }

  goBack(){
    this.location.back();
  }

  fnLoadTable(): void {
    let anyArray_data: any[] = [];
    this.recoveryArray_users.forEach(obj => {
      let any_transformObj = this.fnTransformObj(obj, ['nombre','apellidos','correo', 'semestre' , 'grupo']);
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

  
  fnCheckList(value){
    
    if( this.checkList[value].check == 1 || this.checkList[value].check == 2){
      return;
    }
    this.checkList[value].check = 1;
    let data = {
      idUsuario: value,
      idActividad: this.activitySelected,
      fecha : new Date()
    };
    this.assistanceService.fnPostNewAssistance(data)
    .then(res => {
      this.toastr.success(res);
      this.checkList[value].check = 2;
    })
    .catch(err => {
      this.toastr.error(err);
      this.checkList[value].check = 0;
    }); 
  }

}
