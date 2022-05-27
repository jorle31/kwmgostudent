import { Component, Input,  OnInit } from '@angular/core';
import {Service} from "../shared/service";

@Component({
  selector: 'kgs-service-details',
  templateUrl: './service-details.component.html',
  styles: [
  ]
})
export class ServiceDetailsComponent implements OnInit {

  @Input() service:Service | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
