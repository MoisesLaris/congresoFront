import { Component, OnInit, ViewChild } from '@angular/core';
import { FaqModel } from 'src/app/models/faq.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { FaqService } from 'src/app/services/faq.service';
import { CongressModel } from 'src/app/models/congress.model';
import { CongresoService } from 'src/app/services/congreso.service';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-faq-control',
  templateUrl: './faq-control.component.html',
  styles: []
})
export class FaqControlComponent implements OnInit {

  rows = [];
  temp = [];
  selected = [];

  columns = [
    { prop: 'id' },
    { name: 'comentario' },
    { name: 'respuesta' },
  ];

  congresoSelected = -1;
  tableLoaded = true;

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  recoveryArray_faq: FaqModel[] = [];
  recoveryArray_congress: CongressModel[] = [];

  @ViewChild('myModal') myModal;
  modalRef;
  
  constructor(
    private router: Router,
    private faqService: FaqService,
    private modalService: ModalManager,
    private congressService: CongresoService,
    private toastr: ToastrService,
    private sessionService: SessionService
  ) { }

  userSubscription: Subscription;
  user;

  ngOnInit(): void {
    this.fnGetAllCongress();
    this.subscribeToUser();
  }

  subscribeToUser(){
    this.sessionService._permissions.subscribe(
      data => {
        console.log(data);
        this.user = data;
      }
    )
  }


  fnGetAllCongress(){
    this.congressService.fnGetAllCongress()
    .then(res => {
      this.recoveryArray_congress = res;
    })
    .catch(() => {

    })
  }

  fnGetAllFaqByCongress(){
    this.tableLoaded = false;
    this.faqService.fnGetFaqByCongress(this.congresoSelected)
    .then((res)=>{
      console.log(res);
      this.recoveryArray_faq = res;
      this.fnLoadTable();
    })
    .catch((rej)=>{
      console.log(rej);    
    });
  }

  fnLoadTable(): void {
    let anyArray_data: any[] = [];
    this.recoveryArray_faq.forEach(obj => {
      let any_transformObj = this.fnTransformObj(obj, ['comentario', 'respuesta']);
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
    this.router.navigate(['/system/faq/edit',id]);
  }

  fnDelete(){
    console.log(this.idEliminar);
    // this.faqService.fnPostDeleteCareer(this.idEliminar)
    // .then((res) => {
    //   this.toastr.success(res);
    //   this.fnGetAllFaq();
    // })
    // .catch((err) => {
    //   this.toastr.error(err);
    // });
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
  this.fnGetAllFaqByCongress();
}

}
