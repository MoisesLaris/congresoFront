import { Routes } from "@angular/router";
import { CongresoRootingComponent } from "./congreso-rooting/congreso-rooting.component";
import { CongresoControlComponent } from "./congreso-control/congreso-control.component";
import { CongresoNuevoComponent } from './congreso-nuevo/congreso-nuevo.component';
import { CongresoEditarComponent } from "./congreso-editar/congreso-editar.component";

export const routesCongreso: Routes = [
    {
      path: '',
      component: CongresoRootingComponent,
      children: [
        { path: '', redirectTo: 'control', pathMatch: 'full' },
        { path: 'control', component: CongresoControlComponent  },
        { path: 'new', component: CongresoNuevoComponent},
        { path: 'edit/:id', component: CongresoEditarComponent}
      ]
    }
  ]