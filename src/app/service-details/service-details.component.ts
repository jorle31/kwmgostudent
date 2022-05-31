import {Component, OnInit} from '@angular/core';
import {Comment, Service, Timeslot} from "../shared/service";
import {ServiceCoachingService} from "../shared/service-coaching.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceFactory} from "../shared/service-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {UserFactory} from "../shared/user-factory";
import {User} from "../shared/user";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommentFactory} from "../shared/comment-factory";
import {ToastrService} from "ngx-toastr";
import {TimeslotAgreement} from "../shared/timeslot-agreement";
import {TimeslotFactory} from "../shared/timeslot-factory";


@Component({
  selector: 'kgs-service-details',
  templateUrl: './service-details.component.html',
  styles: [
  ]
})
export class ServiceDetailsComponent implements OnInit {

  service : Service = ServiceFactory.empty();
  user : User = UserFactory.empty();
  timeslot: Timeslot = TimeslotFactory.empty();
  commentForm : FormGroup;
  updateStatusForm : FormGroup;
  isUpdatingComment = false;
  comment : Comment = CommentFactory.empty();
  showStatus : boolean = true;
  showForm : boolean = false;

  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private cs: ServiceCoachingService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthenticationService) {
    this.commentForm = this.fb.group({});
    this.updateStatusForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initService();
    this.initUser();
    if(this.isLoggedIn()){
      this.initForm();
      this.initUpdateStatusForm();
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  initService(){
    const params = this.route.snapshot.params;
    this.cs.getSingle(params['id']).subscribe(s => this.service = s);
  }

  initUser(){
    this.user = this.authService.getCurrentUser();
  }

  initForm(){
    if(this.isLoggedIn()) {
      this.commentForm = this.fb.group({
        id: this.comment.id,
        text: this.comment.text,
      });
    }
  }

  toggleForm(){
    if(this.showForm){
      this.showForm = false;
      this.showStatus = true;
    }
    else{
      this.showForm = true;
      this.showStatus = false;
    }
  }

  initUpdateStatusForm(){
    if(this.isLoggedIn()) {
      this.updateStatusForm = this.fb.group({
        id: this.timeslot.id,
        status: this.timeslot.status,
      });
    }
  }

  editStatus(user_id: number, id : number){
    if(this.isLoggedIn() && this.user.id === user_id && this.user.is_coach){
      this.cs.getSingleTimeslot(id).subscribe(res => {
        this.timeslot = res;
        this.initUpdateStatusForm();
      });
    }
  }

  submitNewStatus(){
    const timeslot : Timeslot = TimeslotFactory.fromObject(this.updateStatusForm.value);
    this.cs.updateTimeslot(timeslot).subscribe(res => {
      this.updateStatusForm.reset(TimeslotFactory.empty());
      this.toggleForm();
      this.initService();
    });
  }

  deletable(){
    let currentServiceTimeslotAgreements = 0;
    for(let timeslot of this.service.timeslots){
      if(timeslot.timeslot_agreement && timeslot.timeslot_agreement.accepted){
        currentServiceTimeslotAgreements++;
      }
    }
    return currentServiceTimeslotAgreements;
  }

  removeService(user_id : number){
    if(this.isLoggedIn() && this.user.id === user_id && this.user.is_coach && this.deletable() === 0){
      if(confirm('Soll das Angebot wirklich gelöscht werden?')){
        this.cs.remove(this.service.id).subscribe(res => this.router.navigate(['../'], {relativeTo: this.route}));
      }
    }
    else{
      alert("Das Angebot konnte nicht gelöscht werden! Entweder sind Timeslots dieses Angebots bereits angenommen oder du musst vorher alle offenen offene Anfragen absagen, um das Angebot löschen zu können!");
    }
  }

  setBooked(id: number) {
    if(this.isLoggedIn() && !this.user.is_coach) {
      this.cs.getSingleTimeslot(id).subscribe(res => {
        this.timeslot = res;
        this.timeslot.is_booked = true;
        this.cs.updateTimeslot(this.timeslot).subscribe(res => {
          const timeslotAgreement = new TimeslotAgreement(0, false, 0, 0, UserFactory.empty());
          timeslotAgreement.timeslot_id = this.timeslot.id;
          timeslotAgreement.user_id = this.user.id;
          this.cs.createTimeslotAgreement(timeslotAgreement).subscribe(res => {
            this.initService();
          });
        });
      });
    }
  }

  submitForm(){
    if(this.isLoggedIn()) {
      const comment: Comment = CommentFactory.fromObject(this.commentForm.value);
      if (this.isUpdatingComment) {
        this.cs.updateComment(comment).subscribe(res => {
          this.commentForm.reset(CommentFactory.empty());
          this.initService();
        });
      } else {
        comment.service_id = this.service.id;
        comment.user_id = this.authService.getCurrentUser().id;
        this.cs.createComment(comment).subscribe(res => {
          this.comment = CommentFactory.empty();
          this.commentForm.reset(CommentFactory.empty());
          this.initService();
        });
      }
    }
  }

  editComment(user_id: number, id : number){
    if(this.isLoggedIn() && this.user.id === user_id){
      this.isUpdatingComment = true;
      this.cs.getCommentById(id).subscribe(res => {
        this.comment = res;
        this.initForm();
      });
    }
  }

  removeTimeslot(timeslot_id : number, user_id : number){
    if(this.isLoggedIn() && this.user.id === user_id && this.service.timeslots.length > 1){
      if(confirm('Soll der Zeitslot wirklich gelöscht werden?')){
        this.cs.getSingleTimeslot(timeslot_id).subscribe(res => {
          if(!res.timeslot_agreement){
            this.cs.removeTimeslot(timeslot_id).subscribe(res => {
              this.initService();
            });
          }
          else if(!res.timeslot_agreement.accepted){
            this.cs.removeTimeslot(timeslot_id).subscribe(res => {
              this.initService();
            });
          }
          else{
            alert('Der Zeitslot konnte nicht gelsöcht werden. Er ist bereits gebucht und bestätigt worden!')
          }
        });
      }
    }
    else{
      alert('Der Zeitslot konnte nicht gelsöcht werden. Er ist der einzige Zeitslot für das Angebot!');
    }
  }

  removeComment(user_id : number, id : number){
    if(this.isLoggedIn() && this.user.id === user_id){
      if(confirm('Soll das Angebot wirklich gelöscht werden?')){
        this.cs.removeComment(id).subscribe(res => {
          this.initService();
        });
      }
    }
  }
}
