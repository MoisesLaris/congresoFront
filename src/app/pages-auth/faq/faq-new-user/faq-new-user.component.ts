import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CongressModel } from 'src/app/models/congress.model';
import { LoginResponseModel } from 'src/app/models/login-response.model';
import { Subscription } from 'rxjs';
import { FaqService } from 'src/app/services/faq.service';
import { CongresoService } from 'src/app/services/congreso.service';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from 'src/app/services/session.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-faq-new-user',
  templateUrl: './faq-new-user.component.html',
  styles: []
})
export class FaqNewUserComponent implements OnInit {

  newFaqForm = new FormGroup({
    comentario: new FormControl(null, [Validators.required]),
    respuesta: new FormControl(' ', Validators.required),
    idCongreso: new FormControl(null, Validators.required)
  });


  arrayCongresos: CongressModel[] = [];
  user:LoginResponseModel = {} as LoginResponseModel;
  
  user_subscription: Subscription;

  constructor(
    private faqService: FaqService,
    private congressService: CongresoService,
    private toastr: ToastrService,
    private location: Location,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.fnGetAllCongress();
    this.fnSubscribeToService();
    this.sessionService._permissions;
  }


  fnSubscribeToService(){
    this.user_subscription = this.sessionService._permissions.subscribe((data: LoginResponseModel) => {
      this.user = data;
    });
  }
  fnGetAllCongress(){
    this.congressService.fnGetAllCongress()
    .then(res => {
      this.arrayCongresos = res;
      this.newFaqForm.patchValue({
        idCongreso: res[0]._id
      })
    })
    .catch(err => {
      this.toastr.error(err);
    })
  }

  goBack(){
    this.location.back();
  }

  onSubmit(){
    
    if(!this.user){
      return;
    }
    let data = this.newFaqForm.value;
    data.idUsuario = this.user.user.sub;
    this.faqService.fnPostNewFaq(data)
    .then(res => {
      this.toastr.success(res);
      this.newFaqForm.reset();
      this.newFaqForm.patchValue({
        idCongreso: this.arrayCongresos[0]._id,
        respuesta: ' '
      })
    })
    .catch(err => {
      this.toastr.error(err);
    })
  }
}
