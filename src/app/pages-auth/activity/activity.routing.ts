import { Routes } from "@angular/router";
import { ActivityRoutingComponent } from "./activity-routing/activity-routing.component";
import { ActivityCalendarComponent } from "./activity-calendar/activity-calendar.component";
import { ActivityNewComponent } from "./activity-new/activity-new.component";
import { ActivityControlComponent } from "./activity-control/activity-control.component";
import { ActivityEditComponent } from "./activity-edit/activity-edit.component";

export const routesActivity: Routes = [
    {
      path: '',
      component: ActivityRoutingComponent,
      children: [
        { path: '', redirectTo: 'control', pathMatch: 'full' },
        { path: 'control', component: ActivityControlComponent },
        { path: 'new', component: ActivityNewComponent},
        { path: 'edit/:id', component: ActivityEditComponent},
        { path: 'calendar', component: ActivityCalendarComponent}
        
      ]
    }
  ]
  