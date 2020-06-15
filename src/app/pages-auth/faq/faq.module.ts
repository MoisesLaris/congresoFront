import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqControlComponent } from './faq-control/faq-control.component';
import { FaqEditComponent } from './faq-edit/faq-edit.component';
import { FaqRoutingComponent } from './faq-routing/faq-routing.component';
import { FaqNewComponent } from './faq-new/faq-new.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngb-modal';
import { routesFaq } from './faq.routing';



@NgModule({
  declarations: [FaqControlComponent, FaqEditComponent, FaqRoutingComponent, FaqNewComponent],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(routesFaq),
    ReactiveFormsModule,
    NgxDatatableModule,
    ModalModule
  ]
})
export class FaqModule { }
