import { Routes } from "@angular/router";
import { CareerRoutingComponent } from "./career-routing/career-routing.component";
import { CareerControlComponent } from "./career-control/career-control.component";
import { CareerNewComponent } from "./career-new/career-new.component";
import { CareerEditComponent } from "./career-edit/career-edit.component";


export const routesCareer: Routes = [
    {
      path: '',
      component: CareerRoutingComponent,
      children: [
        { path: '', redirectTo: 'control', pathMatch: 'full' },
        { path: 'control', component: CareerControlComponent },
        { path: 'new', component: CareerNewComponent},
        { path: 'edit/:id', component: CareerEditComponent}
        
      ]
    }
  ]
  