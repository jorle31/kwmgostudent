import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ServiceFactory } from "../shared/service-factory";
import { ServiceCoachingService } from "../shared/service-coaching.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ServiceFormErrorMessages } from "./service-form-error-messages";
import { Service } from "../shared/service";
import { Subject } from "../shared/subject";
import { AuthenticationService } from "../shared/authentication.service";
import { formatDate } from "@angular/common";
import { User } from "../shared/user";
import { UserFactory } from "../shared/user-factory";

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
  thisDay: any;
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
    this.user = this.authService.getCurrentUser();
    this.thisDay = new Date();
    if(this.isLoggedIn() && this.user.is_coach){
      const serviceId = this.route.snapshot.params['id'];
      if(serviceId && serviceId != 'new_service'){
        this.isUpdatingService = true;
        this.cs.getSingle(serviceId).subscribe(service => {this.service = service; this.initService();});
      }
      this.cs.getAllSubjects().subscribe(res => this.subjects = res);
      this.initService();
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  initService(){
    this.buildThumbnailsArray();
    this.buildTimeslotsArray();
    this.serviceForm = this.fb.group({
      id: this.service.id,
      subject_id: [this.service.subject_id, Validators.required],
      title: [this.service.title, Validators.required],
      subtitle: this.service.subtitle,
      description: this.service.description,
      images: this.images,
      timeslots: this.timeslots
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
    if(this.isLoggedIn() && this.user.is_coach) {
      this.images.push(this.fb.group({id: 0, url: null, title: null}));
    }
  }

  addThumbnailControlDelete(i : number){
    if(this.isLoggedIn()) {
      if (i !== -1) {
        this.images.removeAt(i);
        this.serviceForm.value.images.splice(i, 1);
        this.service.images = this.serviceForm.value.images;
      }
    }
  }

  addTimeslotControlDelete(i : number){
    if(this.isLoggedIn() && this.user.is_coach) {
      if (i !== -1) {
        this.timeslots.removeAt(i);
        this.service.timeslots.splice(i, 1);
        this.serviceForm.value.timeslots.splice(i, 1);
      }
    }
  }

  addTimeslotControl(){
    if(this.isLoggedIn() && this.user.is_coach) {
      this.timeslots.push(this.fb.group({id: 0, from: null, until: null, date: null, is_booked: false}));
    }
  }

  buildThumbnailsArray() {
    if(this.isLoggedIn() && this.user.is_coach) {
      if (this.service.images) {
        this.images = this.fb.array([]);
        for (let img of this.service.images) {
          let fg = this.fb.group({
            id: new FormControl(img.id),
            url: new FormControl(img.url, [Validators.required]),
            title: new FormControl(img.title, [Validators.required])
          });
          this.images.push(fg);
        }
      }
    }
  }

  buildTimeslotsArray(){
    if(this.isLoggedIn() && this.user.is_coach) {
      if(this.service.timeslots) {
        this.timeslots = this.fb.array([]);
        for (let timeslot of this.service.timeslots) {
          if(this.isUpdatingService){
            if(!timeslot.timeslot_agreement && !timeslot.is_booked) {
              let tg = this.fb.group({
                id: new FormControl(timeslot.id),
                from: new FormControl(timeslot.from, [Validators.required]),
                until: new FormControl(timeslot.until, [Validators.required]),
                date: new FormControl(formatDate(new Date(timeslot.date), 'yyyy-MM-dd', 'en'), [Validators.required])
              });
              this.timeslots.push(tg);
            }
          }
          else{
            let tg = this.fb.group({
              id: new FormControl(timeslot.id),
              from: new FormControl(timeslot.from, [Validators.required]),
              until: new FormControl(timeslot.until, [Validators.required]),
              date: new FormControl(formatDate(new Date(timeslot.date), 'yyyy-MM-dd', 'en'), [Validators.required])
            });
            this.timeslots.push(tg);
          }
        }
      }
    }
  }

  submitForm(){
    if(this.isLoggedIn() && this.user.is_coach) {
      this.serviceForm.value.images = this.serviceForm.value.images.filter(
        (thumbnail: { url: string; }) => thumbnail.url
      );
      this.serviceForm.value.timeslots = this.serviceForm.value.timeslots.filter(
        (timeslot: { date: Date; }) => timeslot.date,
      );
      this.serviceForm.value.timeslots = this.serviceForm.value.timeslots.filter(
        (timeslot: { from: string; }) => timeslot.from,
      );
      this.serviceForm.value.timeslots = this.serviceForm.value.timeslots.filter(
        (timeslot: { until: string; }) => timeslot.until,
      );
      const service: Service = ServiceFactory.fromObject(this.serviceForm.value);
      if (this.isUpdatingService && this.user.id === this.service.user_id) {
        this.cs.update(service).subscribe(res => {
          this.router.navigate(['../../../services', service.id], {relativeTo: this.route});
        });
      } else {
        service.user_id = this.authService.getCurrentUser().id;
        this.cs.create(service).subscribe(res => {
          this.service = ServiceFactory.empty();
          this.serviceForm.reset(ServiceFactory.empty());
          this.router.navigate(["../"], {relativeTo: this.route});
        });
      }
    }
  }
}
