import { Injectable } from '@angular/core';
import {Service, Timeslot, Comment} from "./service";
import {HttpClient} from "@angular/common/http";
import {throwError, catchError, retry, Observable} from "rxjs";
import {Subject} from "./subject";
import {User} from "./user";
import {TimeslotAgreement} from "./timeslot-agreement";

@Injectable({
  providedIn: 'root'
})
export class ServiceCoachingService {

  private api = 'http://coachingservice.s1910456022.student.kwmhgb.at/api';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Service>> {
    return this.http.get<Array<Service>>(`${this.api}/services`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getLatestServices(): Observable<Array<Service>> {
    return this.http.get<Array<Service>>(`${this.api}/services/latest`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getSingle(id: string) : Observable<Service> {
    return this.http.get<Service>(`${this.api}/services/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getAllServicesOfUser(id: number) : Observable<Array<Service>> {
    return this.http.get<Array<Service>>(`${this.api}/services/user/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number) : Observable<any> {
    return this.http.delete(`${this.api}/services/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  /*getAllSearch(searchTerm: string) : Observable<Array<Service>> {
    return this.http.get<Service>(`${this.api}/Services/search/${searchTerm}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }*/

  update(service: Service) : Observable<any>{
    return this.http.put(`${this.api}/services/${service.id}`, service).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------*/

  updateTimeslot(timeslot: Timeslot) : Observable<any>{
    return this.http.put(`${this.api}/timeslots/${timeslot.id}`, timeslot).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getSingleTimeslot(id: number) : Observable<Timeslot> {
    return this.http.get<Timeslot>(`${this.api}/timeslots/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  removeTimeslot(id: number) : Observable<any> {
    return this.http.delete(`${this.api}/timeslots/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getAllServicesWithPending(id: number) : Observable<Array<Timeslot>> {
    return this.http.get<Array<Timeslot>>(`${this.api}/timeslots/pending/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getAllServicesWithAccepted(id: number) : Observable<Array<Timeslot>> {
    return this.http.get<Array<Timeslot>>(`${this.api}/timeslots/accepted/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getTimeslotAgreementsByUserId(id: number) : Observable<Array<Timeslot>> {
    return this.http.get<Array<Timeslot>>(`${this.api}/timeslots/student/accepted/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getTimeslotAgreementsPendingByUserId(id: number) : Observable<Array<Timeslot>> {
    return this.http.get<Array<Timeslot>>(`${this.api}/timeslots/student/pending/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------*/
  /*check(id:String) : Observable<Boolean>{
    return this.http.get<Boolean>(`${this.api}/Services/checkid/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }*/

  create(service: Service) : Observable<any>{
    return this.http.post(`${this.api}/services`, service).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------*/

  getCommentById(id: number) : Observable<Comment> {
    return this.http.get<Comment>(`${this.api}/comments/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  createComment(comment: Comment) : Observable<any>{
    return this.http.post(`${this.api}/comments`, comment).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  updateComment(comment: Comment) : Observable<any>{
    return this.http.put(`${this.api}/comments/${comment.id}`, comment).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  removeComment(id: number) : Observable<any> {
    return this.http.delete(`${this.api}/comments/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------*/

  createTimeslotAgreement(timeslotAgreement: TimeslotAgreement) : Observable<any>{
    return this.http.post(`${this.api}/timeslotagreements`, timeslotAgreement).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  updateTimeslotAgreement(timeslotAgreement: TimeslotAgreement) : Observable<any>{
    return this.http.put(`${this.api}/timeslotagreements/${timeslotAgreement.id}`, timeslotAgreement).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getSpecificTimeslotAgreement(id: number) : Observable<TimeslotAgreement> {
    return this.http.get<TimeslotAgreement>(`${this.api}/timeslotagreements/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  removeTimeslotAgreement(id: number) : Observable<any> {
    return this.http.delete(`${this.api}/timeslotagreements/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------*/

  getAllSubjects() : Observable<Array<Subject>>{
    return this.http.get<Array<Subject>>(`${this.api}/subjects`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getSingleSubject(id: string) : Observable<Subject> {
    return this.http.get<Subject>(`${this.api}/subjects/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  checkSubjectExists(subject_id: number) : Observable<Boolean>{
    return this.http.get<Boolean>(`${this.api}/subject/exists/${subject_id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------*/

  getLoggedInUser() : Observable<User> {
    return this.http.get<User>(`${this.api}/users/current`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------*/

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(() => new Error(error));
  }

}
