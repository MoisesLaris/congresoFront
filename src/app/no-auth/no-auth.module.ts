import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NoAuthRoutesComponent } from './no-auth-routes/no-auth-routes.component';
import { RouterModule } from '@angular/router';
import { routesNoAuth } from './no-auth.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { NewUserComponent } from './new-user/new-user.component';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [LoginComponent, NoAuthRoutesComponent, NewUserComponent, ErrorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routesNoAuth),
    ReactiveFormsModule,
  ]
})
export class NoAuthModule { }
