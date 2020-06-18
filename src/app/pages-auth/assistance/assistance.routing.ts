import { Routes } from "@angular/router";
import { AssistanceRoutingComponent } from "./assistance-routing/assistance-routing.component";
import { AssistanceControlComponent } from "./assistance-control/assistance-control.component";


export const routesAsistance: Routes = [
    {
      path: '',
      component: AssistanceRoutingComponent,
      children: [
        { path: '', redirectTo: 'control', pathMatch: 'full' },
        { path: 'control', component: AssistanceControlComponent },
        // { path: 'new', component: CareerNewComponent},
        // { path: 'edit/:id', component: CareerEditComponent}
        
      ]
    }
  ]
  