import { Routes } from "@angular/router";
import { ActivityRoutingComponent } from "./activity-routing/activity-routing.component";

export const routesActivity: Routes = [
    {
      path: '',
      component: ActivityRoutingComponent,
      children: [
        { path: '', redirectTo: 'control', pathMatch: 'full' },
        // { path: 'control', component: UserControlComponent },
        // { path: 'new', component: UserNewComponent},
        // { path: 'edit/:id', component: UserEditComponent}
        
      ]
    }
  ]
  