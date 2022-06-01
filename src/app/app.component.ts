import { Component } from '@angular/core';
import { AuthenticationService } from "./shared/authentication.service";
import { Service } from "./shared/service";

@Component({
  selector: 'kgs-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'kwmgostudent';
  service : Service | undefined;
  showBurgerMenu : boolean = false;
  showNormalMenu : boolean = true;

  constructor(private authService:AuthenticationService) {
  }

  toggleMenu(){
    if(this.showBurgerMenu){
      this.showBurgerMenu = false;
      this.showNormalMenu = true;
    }
    else{
      this.showBurgerMenu = true;
      this.showNormalMenu = false;
    }
  }

  closeBurger (){
    if(this.showBurgerMenu){
      this.showBurgerMenu = false;
      this.showNormalMenu = true;
    }
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
