import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './no-auth/login/login.component'
import { AuthGuard } from './guard/auth.guard';
import { ErrorComponent } from './no-auth/error/error.component';

export const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', loadChildren: './no-auth/no-auth.module#NoAuthModule'},
  {
    path: 'system',
    canActivate: [AuthGuard],
    loadChildren:'./pages-auth/pages-auth.module#PagesAuthModule'
  },
  {path: '**', component: ErrorComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  //preloadingStrategy: PreloadAllModules,  // <- comment this line for enable lazy load
  // useHash: true
});
