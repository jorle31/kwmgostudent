import { Component, OnInit } from '@angular/core';
import {ServiceCoachingService} from "../shared/service-coaching.service";
import {Service} from "../shared/service";

@Component({
  selector: 'kgs-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  services: Service[] = [];

  constructor(private cs: ServiceCoachingService) { }

  ngOnInit(): void {
    this.cs.getAll().subscribe(res => this.services = res.slice(-3).reverse());
  }
}
