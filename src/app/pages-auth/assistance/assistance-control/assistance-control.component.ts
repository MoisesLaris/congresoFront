import { Component, OnInit } from '@angular/core';
import { CongresoService } from 'src/app/services/congreso.service';
import { CongressModel } from 'src/app/models/congress.model';

@Component({
  selector: 'app-assistance-control',
  templateUrl: './assistance-control.component.html',
  styles: []
})
export class AssistanceControlComponent implements OnInit {

  arrayCongress:CongressModel [] = [];

  tableLoaded = true;

  congressSelected = -1;
  


  constructor(
    private congressService: CongresoService
  ) { }

  ngOnInit(): void {
    this.fnGetAllCongress();
  }

  fnGetAllCongress(){
    this.congressService.fnGetAllCongress()
    .then(res => {
      this.arrayCongress = res;
    })
  }



  fnChangeCongress(){

  }

}
