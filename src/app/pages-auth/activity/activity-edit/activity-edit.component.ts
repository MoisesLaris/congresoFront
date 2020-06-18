import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CongressModel } from 'src/app/models/congress.model';
import { CongresoService } from 'src/app/services/congreso.service';
import { ActivityService } from 'src/app/services/activity.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ActivityModel } from 'src/app/models/activity.model';
import { DateModel } from 'src/app/models/date.model';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styles: []
})
export class ActivityEditComponent implements OnInit {


  editActivityForm = new FormGroup({
    idCongreso: new FormControl(null, [Validators.required]),
    nombre: new FormControl(null, [Validators.required]),
    descripcion: new FormControl(null, [Validators.required]),
  });

  arrayCongress:CongressModel[] = [];
  arrayDates: DateModel[] = [];
  fecha: NgbDateStruct;
  color = "#000000";
  
  constructor(
    private congressService: CongresoService,
    private activityService: ActivityService,
    private location: Location,
    private toasrt: ToastrService,
    private route: ActivatedRoute,
  ) { }

  fechaChange = true;

  timeStart = {hour: 10, minute: 9};
  timeEnd = {hour: 11, minute: 9}

  idActivity;

  ngOnInit(): void {
    this.initialiceDate();
    this.idActivity = this.route.snapshot.params.id;
    this.fnGetActivityById();
    this.fnGetAllCongress();
  }

  initialiceDate(){
    let date = new Date();
    
     this.fecha = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  fnGetAllCongress(){
    this.congressService.fnGetAllCongress()
    .then(res => {
      this.arrayCongress = res;
    })
    .catch(() => {})
  }

  fnGetActivityById(){
    this.activityService.fnGetActivityById(this.idActivity)
    .then((res: ActivityModel) => {
      console.log(res);
      if(!res.color){
        this.color = "#000000";
      }else{
        this.color = res.color;
      }
      this.arrayDates = res.fechas;

      this.editActivityForm.setValue({
        idCongreso: res.idCongreso,
        nombre: res.nombre,
        descripcion: res.descripcion
      })
      
    })
    .catch(err => {})
  }

  fnAddDate(){
    if(!this.fnCheckDates()){
      this.toasrt.error("La hora inicio debe ser menor que hora fin");
      return;
    }

    let isEqual = false;
    let obj = {} as DateModel;
    obj = {
      fecha : this.fecha,
      horaInicio: {
        hour: this.timeStart.hour,
        minute: this.timeStart.minute
      },
      horaFin: {
        hour: this.timeEnd.hour,
        minute: this.timeEnd.minute
      }
    };
    console.log(obj);
    this.arrayDates.forEach(aux => {
      console.log("obj", aux);
      if(JSON.stringify(aux) == JSON.stringify(obj)){
        isEqual = true;
        return false;
      }
    });
    if(isEqual){
      this.toasrt.error("No se pueden duplicar las horas");
      return;
    }
    console.log(obj);
    this.arrayDates.push(obj);
  }


  fnCheckDates(): boolean{
    if(this.timeStart.hour < this.timeEnd.hour){
      return true;
    }else if(this.timeStart.hour <= this.timeEnd.hour){
      if(this.timeStart.minute < this.timeEnd.minute){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }

  }

  pop(obj){
    this.arrayDates.splice(obj,1);
  }


  goBack(){
    this.location.back();
  }

  onSubmit(){
    if(this.arrayDates.length <= 0){
      this.toasrt.error("Se deben ingresar fechas");
      return;
    }
    let data = this.editActivityForm.value;
    data.fechas = this.arrayDates;
    data.color = this.color;

    this.activityService.fnPostEditActivity(this.idActivity,data)
    .then(res => {
      this.toasrt.success(res);
      this.location.back();
    })
    .catch(err => {
      this.toasrt.error(err);
    })
  }

}
