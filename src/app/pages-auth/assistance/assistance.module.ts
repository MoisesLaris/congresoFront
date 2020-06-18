import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistanceControlComponent } from './assistance-control/assistance-control.component';
import { AssistanceRoutingComponent } from './assistance-routing/assistance-routing.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngb-modal';
import { routesAsistance } from './assistance.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [AssistanceControlComponent, AssistanceRoutingComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routesAsistance),
    ReactiveFormsModule,
    NgxDatatableModule,
    ModalModule,
    FormsModule
  ]
})
export class AssistanceModule { }
