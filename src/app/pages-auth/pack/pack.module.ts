import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackControlComponent } from './pack-control/pack-control.component';
import { PackEditComponent } from './pack-edit/pack-edit.component';
import { PackNewComponent } from './pack-new/pack-new.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngb-modal';
import { routesPack } from './pack.routing';
import { PackRoutingComponent } from './pack-routing/pack-routing.component';



@NgModule({
  declarations: [PackControlComponent, PackEditComponent, PackNewComponent, PackRoutingComponent],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(routesPack),
    ReactiveFormsModule,
    NgxDatatableModule,
    ModalModule,
    FormsModule
  ]
})
export class PackModule { }
