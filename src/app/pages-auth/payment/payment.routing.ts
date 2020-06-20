import { Routes } from "@angular/router";
import { PaymentRoutingComponent } from "./payment-routing/payment-routing.component";
import { PaymentControlComponent } from "./payment-control/payment-control.component";
import { PaymentNewComponent } from "./payment-new/payment-new.component";
import { PaymentEditComponent } from "./payment-edit/payment-edit.component";


export const routesPayment: Routes = [
    {
      path: '',
      component: PaymentRoutingComponent,
      children: [
        { path: '', redirectTo: 'control', pathMatch: 'full' },
        { path: 'control', component: PaymentControlComponent },
        { path: 'new', component: PaymentNewComponent},
        { path: 'edit/:usuario/:paquete/:pago', component: PaymentEditComponent}
        
      ]
    }
  ]
  