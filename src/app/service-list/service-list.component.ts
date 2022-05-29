import {Component, OnInit} from '@angular/core';
import {Service} from "../shared/service";
import {ServiceCoachingService} from "../shared/service-coaching.service";

@Component({
  selector: 'kgs-service-list',
  templateUrl: './service-list.component.html',
  styles: [
  ]
})
export class ServiceListComponent implements OnInit {

  services: Service[] = [];
  p:any;

  constructor(private cs: ServiceCoachingService) { }

  ngOnInit(): void {
    this.cs.getAll().subscribe(res => this.services = res.reverse());
  }
}
