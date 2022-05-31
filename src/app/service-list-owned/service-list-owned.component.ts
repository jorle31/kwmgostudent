import { Component, OnInit } from '@angular/core';
import {Service, Timeslot} from "../shared/service";
import { ServiceCoachingService } from "../shared/service-coaching.service";
import { AuthenticationService } from "../shared/authentication.service";
import { User } from "../shared/user";
import { UserFactory } from "../shared/user-factory";
import { TimeslotAgreement } from "../shared/timeslot-agreement";

@Component({
  selector: 'kgs-service-list-owned',
  templateUrl: './service-list-owned.component.html',
  styles: [
  ]
})
export class ServiceListOwnedComponent implements OnInit {

  services: Service[] = [];
  p:any;
  page:any;
  user : User = UserFactory.empty();
  timeslots: Timeslot[] = [];

  constructor(private cs: ServiceCoachingService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if(this.isLoggedIn() && this.user.is_coach){
      this.initCoachView();
    }
    else{
      this.initStudentView();
    }
    this.initList();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  initList(){
    if(this.isLoggedIn() && this.user.is_coach) {
      this.cs.getAllServicesOfUser(this.user.id).subscribe(res => this.services = res);
    }
  }

  initCoachView(){
    if(this.isLoggedIn() && this.user.is_coach) {
      this.cs.getAllServicesWithAccepted(this.user.id).subscribe(res => this.timeslots = res);
    }
  }

  initStudentView(){
    if(this.isLoggedIn() && !this.user.is_coach) {
      this.cs.getTimeslotAgreementsByUserId(this.user.id).subscribe(res => this.timeslots = res);
    }
  }
}
