import {Component, Input, OnInit} from '@angular/core';
import {Service} from "../shared/service";

@Component({
  selector: 'a.kgs-service-list-item',
  templateUrl: './service-list-item.component.html',
  styles: [
  ]
})
export class ServiceListItemComponent implements OnInit {

  @Input() service:Service | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
