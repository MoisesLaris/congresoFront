import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FaqService } from 'src/app/services/faq.service';
import { ToastrService } from 'ngx-toastr';
import { FaqModel } from 'src/app/models/faq.model';
import { CongresoService } from 'src/app/services/congreso.service';
import { CongressModel } from 'src/app/models/congress.model';
import { SessionService } from 'src/app/services/session.service';
import { Subscription } from 'rxjs';
import { LoginResponseModel } from 'src/app/models/login-response.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-faq-edit',
  templateUrl: './faq-edit.component.html',
  styles: []
})
export class FaqEditComponent implements OnInit {


  editFaqForm = new FormGroup({
    comentario: new FormControl(null, [Validators.required]),
    respuesta: new FormControl(null, Validators.required),
    idCongreso: new FormControl(null, Validators.required)
  });
  
  idEditar;

  arrayCongresos: CongressModel[] = [];

  user_subscription: Subscription;

  user = {} as LoginResponseModel;

  constructor(
    private route: ActivatedRoute,
    private faqService: FaqService,
    private congressService: CongresoService,
    private sessionService: SessionService,
    private toastr: ToastrService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.idEditar = this.route.snapshot.params.id;
    this.fnGetFaqById();
    this.fnGetAllCongress();
    this.fnGetUser();
  }

  ngOnDestroy(): void {
    if(this.user_subscription){
      this.user_subscription.unsubscribe();
    }
  }

  fnGetUser(){
    this.user_subscription = this.sessionService._permissions.subscribe((data:LoginResponseModel) => {
      this.user = data;
    })
  }

  fnGetAllCongress(){
    this.congressService.fnGetAllCongress()
    .then(res => {
      this.arrayCongresos = res;
    })
    .catch(() => {

    })
  }
  fnGetFaqById(){
    this.faqService.fnGetFaqById(this.idEditar)
    .then((res:FaqModel) => {
      console.log(res);
      this.editFaqForm.setValue({
        comentario: res.comentario,
        respuesta: res.respuesta,
        idCongreso: res.idCongreso
      })
    })
    .catch(err => {
      this.toastr.error(err);
    })
  }

  onSubmit(){
    let data = this.editFaqForm.value;
    this.faqService.fnPostEditFaq(this.idEditar,data)
    .then(res => {
      this.toastr.success(res);
      this.location.back();
    })
    .catch(err => {
      this.toastr.error(err);
    })
  }

  goBack(){
    this.location.back();
  }

}
