import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CongressModel } from 'src/app/models/congress.model';
import { CongresoService } from 'src/app/services/congreso.service';
import { Router } from '@angular/router';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from 'src/app/services/activity.service';
import { ActivityModel } from 'src/app/models/activity.model';

@Component({
  selector: 'app-activity-control',
  templateUrl: './activity-control.component.html',
  styles: []
})
export class ActivityControlComponent implements OnInit {

  tableLoaded = true;

  congressSelected = -1;

  rows = [];
  temp = [];
  selected = [];

  columns = [
    { prop: 'id' },
    { name: 'nombre' },
    { name: 'centro' },
  ];

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  recoveryArray_congress: CongressModel[] = [];
  recoveryArray_activity: ActivityModel[] = [];

  @ViewChild('myModal') myModal;
  modalRef;

  constructor(
    private router: Router,
    private modalService: ModalManager,
    private congressService: CongresoService,
    private activityService: ActivityService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.fnGetAllCongress();
  }

  fnGetAllCongress() {
    this.congressService.fnGetAllCongress()
    .then(res => {
      this.recoveryArray_congress = res;
    })
    .catch(() => {});
  }

  fnGetAllActivitiesByCongress(){
    this.tableLoaded=false;
    this.activityService.fnGetActivityByCongress(this.congressSelected)
    .then(res => {

      this.recoveryArray_activity = res;
      this.fnLoadTable();
    })
    .catch(err => {
      this.toastr.error(err);
      this.tableLoaded=true;
    })
    
  }

  fnChangeCongress(){
    this.fnGetAllActivitiesByCongress();
  }

  fnLoadTable(): void {
    let anyArray_data: any[] = [];
    this.recoveryArray_activity.forEach(obj => {
      let any_transformObj = this.fnTransformObj(obj, ['nombre', 'descripcion']);
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
    this.router.navigate(['/system/activity/edit',id]);
  }

  fnDelete(){
    console.log(this.idEliminar);
    this.activityService.fnPostDeleteActivity(this.idEliminar)
    .then((res) => {
      this.toastr.success(res);
      this.fnGetAllActivitiesByCongress();
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
