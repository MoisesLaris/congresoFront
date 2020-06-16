import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityRoutingComponent } from './activity-routing/activity-routing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngb-modal';
import { routesActivity } from './activity.routing';



@NgModule({
  declarations: [ActivityRoutingComponent],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(routesActivity),
    ReactiveFormsModule,
    NgxDatatableModule,
    ModalModule,
    FormsModule
  ]
})
export class ActivityModule { }
