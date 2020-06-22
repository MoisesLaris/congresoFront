import { Routes } from "@angular/router";
import { FaqRoutingComponent } from "./faq-routing/faq-routing.component";
import { FaqControlComponent } from "./faq-control/faq-control.component";
import { FaqNewComponent } from "./faq-new/faq-new.component";
import { FaqEditComponent } from "./faq-edit/faq-edit.component";
import { PagesGuard } from "src/app/guard/pages.guard";
import { FaqNewUserComponent } from "./faq-new-user/faq-new-user.component";


export const routesFaq: Routes = [
    {
      path: '',
      component: FaqRoutingComponent,
      children: [
        { path: '', redirectTo: 'control', pathMatch: 'full' },
        { path: 'control', component: FaqControlComponent },
        { path: 'new', component: FaqNewComponent},
        { path: 'edit/:id',canActivate: [PagesGuard], component: FaqEditComponent},
        { path: 'new-user', component: FaqNewUserComponent}
        
      ]
    }
  ]
  