import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoAuthRoutesComponent } from './no-auth-routes/no-auth-routes.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ErrorComponent } from './error/error.component';



export const routesNoAuth: Routes = [
  {
    path: '',
    component: NoAuthRoutesComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: NewUserComponent},
      { path: 'error', component: ErrorComponent}
    ]
  }
]
