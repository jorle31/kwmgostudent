import { Component, OnInit } from '@angular/core';
import { ServiceCoachingService } from "../shared/service-coaching.service";
import {Service, Timeslot} from "../shared/service";
import { User } from "../shared/user";
import { UserFactory } from "../shared/user-factory";
import { AuthenticationService } from "../shared/authentication.service";
import { TimeslotAgreement } from "../shared/timeslot-agreement";
import { TimeslotFactory } from "../shared/timeslot-factory";

@Component({
  selector: 'kgs-service-list-pending',
  templateUrl: './service-list-pending.component.html',
  styles: [
  ]
})
export class ServiceListPendingComponent implements OnInit {

  p:any;
  user : User = UserFactory.empty();
  services: Service[] = [];
  timeslots: Timeslot[] = [];

  constructor(private cs: ServiceCoachingService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if(this.isLoggedIn() && this.user.is_coach){
      this.initCoachView();
    }else{
      this.initStudentView();
    }
  }

  initCoachView(){
    if(this.isLoggedIn() && this.user.is_coach) {
      this.cs.getAllServicesWithPending(this.user.id).subscribe(res => this.timeslots = res);
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  initStudentView(){
    if(this.isLoggedIn() && !this.user.is_coach) {
      this.cs.getTimeslotAgreementsPendingByUserId(this.user.id).subscribe(res => this.timeslots = res);
    }
  }

  finalizeBooking(id : number, user_id : number) {
    if (this.isLoggedIn() && this.user.is_coach && user_id === this.user.id) {
      let timeslotAgreement = new TimeslotAgreement(0, false, 0, 0, UserFactory.empty());
      this.cs.getSpecificTimeslotAgreement(id).subscribe(res => {
        timeslotAgreement = res;
        timeslotAgreement.accepted = true;
        this.cs.updateTimeslotAgreement(timeslotAgreement).subscribe(res => this.initCoachView());
      });
    }
  }

  removeBooking(timeslot_id : any, agreement_id : number, user_id : number){
    if (this.isLoggedIn() && user_id === this.user.id) {
      let timeslot = TimeslotFactory.empty();
      this.cs.getSingleTimeslot(timeslot_id).subscribe(res => {
        timeslot = res;
        timeslot.is_booked = false;
        this.cs.updateTimeslot(timeslot).subscribe(res => {
          this.cs.removeTimeslotAgreement(agreement_id).subscribe(res => {
            if(this.user.is_coach){
              this.initCoachView();
            }
            else{
              this.initStudentView();
            }
          });
        });
      });
    }
  }
}
