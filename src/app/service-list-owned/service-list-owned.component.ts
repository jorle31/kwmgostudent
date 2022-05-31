import { Component, OnInit } from '@angular/core';
import { Service } from "../shared/service";
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
  servicesHistory: Service[] = [];
  timeslotHistory: TimeslotAgreement[] = [];
  p:any;
  page:any;
  user : User = UserFactory.empty();

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
      this.cs.getAllServicesOfUser(this.user.id).subscribe(res => this.services = res.reverse());
    }
  }

  initCoachView(){
    if(this.isLoggedIn() && this.user.is_coach) {
      this.cs.getAllServicesWithAccepted(this.user.id).subscribe(res => this.servicesHistory = res.reverse());
    }
  }

  initStudentView(){
    if(this.isLoggedIn() && !this.user.is_coach) {
      this.cs.getTimeslotAgreementsByUserId(this.user.id).subscribe(res => this.timeslotHistory = res.reverse());
    }
  }
}
