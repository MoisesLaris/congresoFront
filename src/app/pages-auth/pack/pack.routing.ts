import { Routes } from "@angular/router";
import { PackRoutingComponent } from "./pack-routing/pack-routing.component";
import { PackControlComponent } from "./pack-control/pack-control.component";
import { PackNewComponent } from "./pack-new/pack-new.component";
import { PackEditComponent } from "./pack-edit/pack-edit.component";


export const routesPack: Routes = [
    {
      path: '',
      component: PackRoutingComponent,
      children: [
        { path: '', redirectTo: 'control', pathMatch: 'full' },
        { path: 'control', component: PackControlComponent },
        { path: 'new', component: PackNewComponent},
        { path: 'edit/:id', component: PackEditComponent}
        
      ]
    }
  ]
  