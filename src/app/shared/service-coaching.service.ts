import { Injectable } from '@angular/core';
import {Service} from "./service";
import {HttpClient} from "@angular/common/http";
import {throwError, catchError, retry, Observable} from "rxjs";
import {Subject} from "./subject";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class ServiceCoachingService {

  private api = 'http://coachingservice.s1910456022.student.kwmhgb.at/api';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Service>> {
    return this.http.get<Array<Service>>(`${this.api}/services`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getSingle(id: string) : Observable<Service> {
    return this.http.get<Service>(`${this.api}/services/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getAllServicesOfUser(id: string) : Observable<Array<Service>> {
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

  /*check(id:String) : Observable<Boolean>{
    return this.http.get<Boolean>(`${this.api}/Services/checkid/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }*/

  create(service: Service) : Observable<any>{
    return this.http.post(`${this.api}/services`, service).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSubjects() : Observable<Array<Subject>>{
    return this.http.get<Array<Subject>>(`${this.api}/subjects`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getSingleSubject(id: string) : Observable<Subject> {
    return this.http.get<Subject>(`${this.api}/subjects/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getLoggedInUser() : Observable<User> {
    return this.http.get<User>(`${this.api}/users/current`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(() => new Error(error));
  }

}
