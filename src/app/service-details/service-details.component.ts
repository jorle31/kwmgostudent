import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Service} from "../shared/service";
import {ServiceCoachingService} from "../shared/service-coaching.service";
import {ActivatedRoute, Router, RoutesRecognized} from "@angular/router";
import {ServiceFactory} from "../shared/service-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {UserFactory} from "../shared/user-factory";
import {User} from "../shared/user";
import {AppComponent} from "../app.component";

@Component({
  selector: 'kgs-service-details',
  templateUrl: './service-details.component.html',
  styles: [
  ]
})
export class ServiceDetailsComponent implements OnInit {

  service : Service = ServiceFactory.empty();
  user : User = UserFactory.empty();

  constructor(private cs: ServiceCoachingService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.cs.getSingle(params['id']).subscribe(s => this.service = s);
    this.user = this.authService.getCurrentUser();
  }

  removeService(){
    if(confirm('Soll das Angebot wirklich gelöscht werden?')){
      this.cs.remove(this.service.id).subscribe(res => this.router.navigate(['../'], {relativeTo: this.route}));
    }
  }
}
