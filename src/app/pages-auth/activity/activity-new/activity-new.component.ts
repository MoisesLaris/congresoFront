import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CongressModel } from 'src/app/models/congress.model';
import { CongresoService } from 'src/app/services/congreso.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateModel } from 'src/app/models/date.model';
import { AngularSectionComponent } from 'src/app/sections/angular-section/angular-section.component';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from 'src/app/services/activity.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-activity-new',
  templateUrl: './activity-new.component.html',
  styles: []
})
export class ActivityNewComponent implements OnInit {

  arrayDates: DateModel[] = [];

  newActivityForm = new FormGroup({
    idCongreso: new FormControl(null, [Validators.required]),
    nombre: new FormControl(null, [Validators.required]),
    descripcion: new FormControl(null, [Validators.required]),
  });
  
  arrayCongress:CongressModel[] = [];
  fecha: NgbDateStruct;
  constructor(
    private congressService: CongresoService,
    private activityService: ActivityService,
    private location: Location,
    private toasrt: ToastrService
  ) { }

  ngOnInit(): void {
    this.fnGetAllCongress();
    this.initialiceDate();
  }
  
  fechaChange = true;

  timeStart = {hour: 10, minute: 9};
  timeEnd = {hour: 11, minute: 9}

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
    .then((res:CongressModel[]) => {
      this.arrayCongress = res;
      this.newActivityForm.patchValue({
        idCongreso: this.arrayCongress[0]._id
      })
    })
    .catch(err => {

    });
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

  fnFormateDate(): string{
    if(!this.fecha?.year){
      return;
    }
    let año = this.fecha.year;
    let mes = this.fecha.month;
    let dia = this.fecha.day;
    //hora inicio
 

    //hora fin 


    return '';
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

  onSubmit(){

    if(this.arrayDates.length <= 0){
      this.toasrt.error("Se deben ingresar fechas");
      return;
    }

    let data = this.newActivityForm.value;
    data.fechas = this.arrayDates;
    
    this.activityService.fnPostNewActivity(data)
    .then(res => {
      this.toasrt.success(res);
      this.arrayDates = [];
      this.newActivityForm.patchValue({
        idCongreso: this.arrayCongress[0]._id
      })
      this.fecha = null;
      this.timeStart = {hour: 10, minute: 9};
      this.timeEnd = {hour: 11, minute: 9};
    })
    .catch(err => {
      this.toasrt.error(err);
    })
    
  }

  goBack(){
    this.location.back();
  }

}
