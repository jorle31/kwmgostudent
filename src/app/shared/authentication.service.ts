import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user";

interface Token {
  exp: number;
  user: {
    id: string;
    is_coach: string;
    name: string,
    degree: string,
    degree_description: string,
    telephone: string,
    email: string
  }
}

@Injectable()
export class AuthenticationService {

  private api = 'http://coachingService.s1910456022.student.kwmhgb.at/api/auth';

  constructor(private http:HttpClient) {
  }

  /*public getCurrentUserId(){
    return Number.parseInt(<string>sessionStorage.getItem("userRole"));
  }

  public getCurrentUserRole(){
    return Number.parseInt(<string>sessionStorage.getItem("userRole"));
  }

  getCurrentUserName(){
    return sessionStorage.getItem("userName");
  }*/

  public setSessionStorage (token:string) {
    sessionStorage.setItem("token", token);
  }

  login(email:string, password:string) : Observable<any>{
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public logout(){
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userName');
  }

  public isLoggedIn(){
    if(sessionStorage.getItem('token')){
      let token : string = <string>sessionStorage.getItem('token');
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if(expirationDate < new Date()){
        sessionStorage.removeItem('token');
        return false;
      }
      return true;
    }
    else{
      return false;
    }
  }

  public isLoggedOut(){
    return !this.isLoggedIn();
  }

  getCurrentUser() : User {
    return this.decodeToken();
  }

  decodeToken(): User {
    if (sessionStorage.getItem("token")) {
      const decodedToken = jwt_decode(<string>sessionStorage.getItem("token")) as Token;
      return new User(+decodedToken.user.id, decodedToken.user.name, decodedToken.user.degree, decodedToken.user.degree_description, decodedToken.user.email, decodedToken.user.telephone, +decodedToken.user.is_coach == 1);
    } {
      return new User(0, '', '', '', '', '', false);
    }
  }
}
