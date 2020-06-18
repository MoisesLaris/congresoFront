import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesAuthRoutingComponent } from './pages-auth-routing/pages-auth-routing.component';
import { RouterModule } from '@angular/router';
import { routesPagesAuth } from './pages-auth.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeSystemComponent } from './home-system/home-system.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [PagesAuthRoutingComponent, HomeSystemComponent, NavbarComponent,],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(routesPagesAuth),
    ReactiveFormsModule,
  ]
})
export class PagesAuthModule { }
