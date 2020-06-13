import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserControlComponent } from './user-control/user-control.component';
import { UserRoutingComponent } from './user-routing/user-routing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routesUser } from './user.routing';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserNewComponent } from './user-new/user-new.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngb-modal';



@NgModule({
  declarations: [UserControlComponent, UserRoutingComponent, UserEditComponent, UserNewComponent],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(routesUser),
    ReactiveFormsModule,
    NgxDatatableModule,
    ModalModule
  ]
})
export class UserModule { }
