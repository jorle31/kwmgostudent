import {Component, ElementRef, Inject, Input} from '@angular/core';
import {AuthenticationService} from "./shared/authentication.service";
import {Service} from "./shared/service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'kgs-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'kwmgostudent';
  listOn = true;
  detailsOn = false;

  @Input() service:Service | undefined;
  constructor(private authService:AuthenticationService) {
  }
  /*constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(){
    this.document.body.classList.add('');
  }*/

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getCurrentUserRole(){
    return this.authService.getCurrentUserRole();
  }

  logout(){
    this.authService.logout();
  }
}
