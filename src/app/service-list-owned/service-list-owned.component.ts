import { Component, OnInit } from '@angular/core';
import {Service} from "../shared/service";
import {ServiceCoachingService} from "../shared/service-coaching.service";
import {AuthenticationService} from "../shared/authentication.service";
import {User} from "../shared/user";
import {UserFactory} from "../shared/user-factory";

@Component({
  selector: 'kgs-service-list-owned',
  templateUrl: './service-list-owned.component.html',
  styles: [
  ]
})
export class ServiceListOwnedComponent implements OnInit {

  services: Service[] = [];
  p:any;
  user : User = UserFactory.empty();

  constructor(private cs: ServiceCoachingService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.initList();
  }

  initList(){
    this.cs.getAllServicesOfUser(this.user.id.toString()).subscribe(res => this.services = res.reverse());
  }
}
