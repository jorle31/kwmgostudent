import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServiceFactory} from "../shared/service-factory";
import {ServiceCoachingService} from "../shared/service-coaching.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Image} from "../shared/image";
import {ServiceFormErrorMessages} from "./service-form-error-messages";
import {Service} from "../shared/service";
import {Subject} from "../shared/subject";
import {AuthenticationService} from "../shared/authentication.service";
import {User} from "../shared/user";
import {UserFactory} from "../shared/user-factory";

@Component({
  selector: 'kgs-service-form',
  templateUrl: './service-form.component.html',
  styles: [
  ]
})
export class ServiceFormComponent implements OnInit {

  serviceForm : FormGroup;
  service = ServiceFactory.empty();
  errors: {[key: string]: string } = {};
  isUpdatingService = false;
  images: FormArray;
  timeslots: FormArray;
  subjects : Subject[] = [];
  user : User = UserFactory.empty();

  constructor(private fb: FormBuilder,
              private cs: ServiceCoachingService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
    this.serviceForm = this.fb.group({});
    this.images = this.fb.array([]);
    this.timeslots = this.fb.array([]);
  }

  ngOnInit(): void {
    const serviceId = this.route.snapshot.params['id'];
    if(serviceId && serviceId != 'new_service'){
      this.isUpdatingService = true;
      this.cs.getSingle(serviceId).subscribe(service => {this.service = service; this.initService();});
    }
    this.cs.getAllSubjects().subscribe(res => this.subjects = res);
    if(this.authService.isLoggedIn()){
      this.cs.getLoggedInUser().subscribe(user => this.user = user);
    }
    this.initService();
  }

  initService(){
    this.buildThumbnailsArray();
    this.buildTimeslotsArray();
    this.serviceForm = this.fb.group({
      id: this.service.id,
      subject_id: this.service.subject_id,
      title: [this.service.title, Validators.required],
      subtitle: this.service.subtitle,
      description: this.service.description,
      images: this.images,
      timeslots: this.service.timeslots
    });

    this.serviceForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    )
  }

  updateErrorMessages(){
    this.errors = {};
    for(const message of ServiceFormErrorMessages){
      const control = this.serviceForm.get(message.forControl);

      if(control && control.dirty && control.invalid && control.errors && control.errors[message.forValidator] && !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }

  addThumbnailControl(){
    this.images.push(this.fb.group({id: 0, url:null, title:null}));
  }

  addTimeslotControl(){
    this.timeslots.push(this.fb.group({id: 0, from: new Date(), until: new Date(), date: new Date(), is_booked: false, service_id: 0}));
  }

  buildThumbnailsArray(){
    if(this.service.images){
      this.images = this.fb.array([]);
      for(let img of this.service.images){
        let fg = this.fb.group({
          id: new FormControl(img.id),
          url: new FormControl(img.url, [Validators.required]),
          title: new FormControl(img.title, [Validators.required])
        });
        this.images.push(fg);
      }
    }
  }

  buildTimeslotsArray(){
    if(this.service.timeslots){
      this.timeslots = this.fb.array([]);
      for(let timeslot of this.service.timeslots){
        let fg = this.fb.group({
          id: new FormControl(timeslot.id),
          from: new FormControl(timeslot.from),
          until: new FormControl(timeslot.until),
          date: new FormControl(timeslot.date),
          is_booked: new FormControl(timeslot.is_booked)
        });
        this.timeslots.push(fg);
      }
    }
  }

  submitForm(){
    this.serviceForm.value.images = this.serviceForm.value.images.filter(
      (thumbnail: {url:string; }) => thumbnail.url
    );
    const service: Service = ServiceFactory.fromObject(this.serviceForm.value);
    if(this.isUpdatingService){
      this.cs.update(service).subscribe(res => {
        this.router.navigate(['../../../services', service.id], {relativeTo: this.route});
      });
    }
    else{
      service.user_id = this.user.id;
      this.cs.create(service).subscribe(res => {
        this.service = ServiceFactory.empty();
        this.serviceForm.reset(ServiceFactory.empty());
        this.router.navigate(["../"], {relativeTo: this.route});
      });
    }
  }
}
