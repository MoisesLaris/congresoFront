import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentControlComponent } from './payment-control/payment-control.component';
import { PaymentNewComponent } from './payment-new/payment-new.component';
import { PaymentEditComponent } from './payment-edit/payment-edit.component';
import { PaymentRoutingComponent } from './payment-routing/payment-routing.component';



@NgModule({
  declarations: [PaymentControlComponent, PaymentNewComponent, PaymentEditComponent, PaymentRoutingComponent],
  imports: [
    CommonModule
  ]
})
export class PaymentModule { }
