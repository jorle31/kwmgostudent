import { NgModule } from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import {ServiceListComponent} from "./service-list/service-list.component";
import {ServiceListItemComponent} from "./service-list-item/service-list-item.component";
import {ServiceListOwnedComponent} from "./service-list-owned/service-list-owned.component";
import {ServiceListSavedComponent} from "./service-list-saved/service-list-saved.component";
import {ServiceListBookedComponent} from "./service-list-booked/service-list-booked.component";
import {LoginComponent} from "./login/login.component";
import {CanNavigateToUserSpacesGuard} from "./can-navigate-to-user-spaces.guard";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'services', component: ServiceListComponent},
  {path: 'services/:id', component: ServiceListItemComponent},
  {path: 'user/services', component: ServiceListOwnedComponent, canActivate: [CanNavigateToUserSpacesGuard]},
  {path: 'user/services_saved', component: ServiceListSavedComponent, canActivate: [CanNavigateToUserSpacesGuard]},
  {path: 'user/services_booked', component: ServiceListBookedComponent, canActivate: [CanNavigateToUserSpacesGuard]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanNavigateToUserSpacesGuard]
})

export class AppRoutingModule{}
