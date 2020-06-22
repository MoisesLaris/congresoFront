import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityRoutingComponent } from './activity-routing/activity-routing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngb-modal';
import { routesActivity } from './activity.routing';
import { ActivityCalendarComponent } from './activity-calendar/activity-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ActivityControlComponent } from './activity-control/activity-control.component';
import { ActivityNewComponent } from './activity-new/activity-new.component';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';
import { ActivityCalendarAdminComponent } from './activity-calendar-admin/activity-calendar-admin.component';
import { ActivityAssistanceComponent } from './activity-assistance/activity-assistance.component';



@NgModule({
  declarations: [ActivityRoutingComponent, ActivityCalendarComponent, ActivityControlComponent, ActivityNewComponent, ActivityEditComponent, ActivityCalendarAdminComponent, ActivityAssistanceComponent],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(routesActivity),
    ReactiveFormsModule,
    NgxDatatableModule,
    ModalModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ]
})
export class ActivityModule { }
