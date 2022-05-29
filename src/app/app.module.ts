import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule} from "@angular/forms";
import { ServiceListItemComponent } from './service-list-item/service-list-item.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import { ServiceListBookedComponent } from './service-list-booked/service-list-booked.component';
import { ServiceListOwnedComponent } from './service-list-owned/service-list-owned.component';
import { ServiceListSavedComponent } from './service-list-saved/service-list-saved.component';
import { AuthenticationService } from "./shared/authentication.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptorService } from "./shared/token-interceptor.service";
import { ToastrModule } from "ngx-toastr";
import { JwtInterceptorService } from "./shared/jwt-interceptor.service";
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceCoachingService } from "./shared/service-coaching.service";
import { ServiceFormComponent } from './service-form/service-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ServiceListComponent,
    LoginComponent,
    ServiceListItemComponent,
    HomeComponent,
    ServiceListBookedComponent,
    ServiceListOwnedComponent,
    ServiceListSavedComponent,
    ServiceDetailsComponent,
    ServiceFormComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [ServiceCoachingService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
