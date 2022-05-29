import {Component} from '@angular/core';
import {AuthenticationService} from "./shared/authentication.service";
import {Service} from "./shared/service";

@Component({
  selector: 'kgs-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'kwmgostudent';
  service : Service | undefined;

  constructor(private authService:AuthenticationService) {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getCurrentUser(){
    return this.authService.getCurrentUser();
  }

  logout(){
    this.authService.logout();
  }
}
