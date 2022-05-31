import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ServiceListComponent } from "./service-list/service-list.component";
import { ServiceListOwnedComponent } from "./service-list-owned/service-list-owned.component";
import { LoginComponent } from "./login/login.component";
import { CanNavigateToUserSpacesGuard } from "./can-navigate-to-user-spaces.guard";
import { ServiceDetailsComponent } from "./service-details/service-details.component";
import { ServiceFormComponent } from "./service-form/service-form.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ServiceListPendingComponent } from "./service-list-pending/service-list-pending.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'services', component: ServiceListComponent},
  {path: 'services/:id', component: ServiceDetailsComponent},
  {path: 'user/services', component: ServiceListOwnedComponent, canActivate: [CanNavigateToUserSpacesGuard]},
  {path: 'user/services/:id', component: ServiceFormComponent, canActivate: [CanNavigateToUserSpacesGuard]},
  {path: 'user/services/new_service', component: ServiceFormComponent, canActivate: [CanNavigateToUserSpacesGuard]},
  {path: 'user/pending', component: ServiceListPendingComponent, canActivate: [CanNavigateToUserSpacesGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToUserSpacesGuard]
})

export class AppRoutingModule{}
