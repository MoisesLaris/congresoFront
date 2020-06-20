import { Routes } from "@angular/router";
import { PagesAuthRoutingComponent } from "./pages-auth-routing/pages-auth-routing.component";
import { HomeSystemComponent } from "./home-system/home-system.component";
import { PagesGuard } from "../guard/pages.guard";

export const routesPagesAuth: Routes = [
    {
      path: '',
      component: PagesAuthRoutingComponent,
      children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeSystemComponent },
        { path: 'user', canActivate:[PagesGuard], loadChildren: './user/user.module#UserModule'},
        { path: 'career', canActivate:[PagesGuard], loadChildren: './career/career.module#CareerModule'},
        { path: 'congress', canActivate:[PagesGuard], loadChildren: './congreso/congreso.module#CongresoModule'}, 
        { path: 'faq', loadChildren: './faq/faq.module#FaqModule'},
        { path: 'package',canActivate:[PagesGuard], loadChildren: './pack/pack.module#PackModule'},
        { path: 'activity', loadChildren: './activity/activity.module#ActivityModule'},
        { path: 'assistance',canActivate:[PagesGuard], loadChildren: './assistance/assistance.module#AssistanceModule'},
        { path: 'payment',canActivate:[PagesGuard], loadChildren: './payment/payment.module#PaymentModule'}
      ]
    }
  ]
  