import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CongresoControlComponent } from './congreso-control/congreso-control.component';
import { CongresoEditarComponent } from './congreso-editar/congreso-editar.component';
import { CongresoNuevoComponent } from './congreso-nuevo/congreso-nuevo.component';
import { CongresoRootingComponent } from './congreso-rooting/congreso-rooting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { routesCongreso } from './congreso.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngb-modal';



@NgModule({
  declarations: [CongresoControlComponent, CongresoEditarComponent, CongresoNuevoComponent, CongresoRootingComponent],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(routesCongreso),
    ReactiveFormsModule,
    NgxDatatableModule,
    ModalModule
  ]
})
export class CongresoModule { }
