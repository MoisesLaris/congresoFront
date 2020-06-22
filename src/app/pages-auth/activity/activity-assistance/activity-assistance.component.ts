import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { CongresoService } from 'src/app/services/congreso.service';
import { CongressModel } from 'src/app/models/congress.model';
import { ActivityModel } from 'src/app/models/activity.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AssistanceService } from 'src/app/services/assistance.service';
import { AssistanceModel } from 'src/app/models/assistance.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-activity-assistance',
  templateUrl: './activity-assistance.component.html',
  styleUrls: ['./activity-assistance.component.css']
})
export class ActivityAssistanceComponent implements OnInit {

  arrayCongress: CongressModel[] = [];
  arrayActivity: ActivityModel[] = [];
  arrayAssistance: AssistanceModel[] = [];

  congressSelected = -1;
  activitySelected = -1;

  tableLoaded = true;
  rows = [];
  temp = [];
  selected = [];

  columns = [
    { prop: 'id' },
    { name: 'idUsuario' },
    { name: 'fecha' },
  ];

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;


  constructor(
    private activityService: ActivityService,
    private congressService: CongresoService,
    private assistanceService: AssistanceService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.fnGetAllCongress();
  }

  fnGetAllCongress(){
    this.congressService.fnGetAllCongress()
    .then(res => {
      this.arrayCongress = res;
    })
    .catch(() => {});
  }
  
  fnGetActivityByCongress(){
    this.activityService.fnGetActivityByCongress(this.congressSelected)
    .then(res => {
      this.arrayActivity = res;
    })
    .catch(() => {});
  }  

  fnGetAsistances(){
    this.tableLoaded = false;
    this.assistanceService.fnGetAssistancesByActivity(this.activitySelected)
    .then(res => {
      this.arrayAssistance = res;
      this.fnLoadTable();
      this.tableLoaded = true;
    })
    .catch(() => {});
  }


  fnChangeCongress(){
    this.activitySelected = -1;
    this.fnGetActivityByCongress();
  }

  fnChangeActivity(){
    this.fnGetAsistances();
  }

  fnLoadTable(): void {
    let anyArray_data: any[] = [];
    this.arrayAssistance.forEach(obj => {
      let any_transformObj = this.fnTransformObj(obj, ['idUsuario', 'fecha', 'idActividad']);
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

  onBack(){
    this.location.back();
  }


}
