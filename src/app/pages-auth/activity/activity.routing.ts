import { Routes } from "@angular/router";
import { ActivityRoutingComponent } from "./activity-routing/activity-routing.component";
import { ActivityCalendarComponent } from "./activity-calendar/activity-calendar.component";
import { ActivityNewComponent } from "./activity-new/activity-new.component";

export const routesActivity: Routes = [
    {
      path: '',
      component: ActivityRoutingComponent,
      children: [
        { path: '', redirectTo: 'control', pathMatch: 'full' },
        // { path: 'control', component: UserControlComponent },
        { path: 'new', component: ActivityNewComponent},
        // { path: 'edit/:id', component: UserEditComponent}
        { path: 'calendar', component: ActivityCalendarComponent}
        
      ]
    }
  ]
  