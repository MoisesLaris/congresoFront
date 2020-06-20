import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentControlComponent } from './payment-control/payment-control.component';
import { PaymentNewComponent } from './payment-new/payment-new.component';
import { PaymentEditComponent } from './payment-edit/payment-edit.component';
import { PaymentRoutingComponent } from './payment-routing/payment-routing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngb-modal';
import { routesPayment } from './payment.routing';



@NgModule({
  declarations: [PaymentControlComponent, PaymentNewComponent, PaymentEditComponent, PaymentRoutingComponent],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(routesPayment),
    ReactiveFormsModule,
    NgxDatatableModule,
    ModalModule,
    FormsModule
  ]
})
export class PaymentModule { }
