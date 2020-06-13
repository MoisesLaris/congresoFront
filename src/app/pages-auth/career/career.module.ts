import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerControlComponent } from './career-control/career-control.component';
import { CareerRoutingComponent } from './career-routing/career-routing.component';
import { CareerEditComponent } from './career-edit/career-edit.component';
import { CareerNewComponent } from './career-new/career-new.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngb-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { routesCareer } from './career.routing';



@NgModule({
  declarations: [CareerControlComponent, CareerRoutingComponent, CareerEditComponent, CareerNewComponent],
  imports: [
    CommonModule,
    NgbModule,
    CommonModule,
    RouterModule.forChild(routesCareer),
    ReactiveFormsModule,
    NgxDatatableModule,
    ModalModule
  ]
})
export class CareerModule { }
