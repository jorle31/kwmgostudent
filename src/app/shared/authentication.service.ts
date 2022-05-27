import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

interface Token {
  exp: number;
  user: {
    id: string;
    is_coach: string
  }
}

@Injectable()
export class AuthenticationService {

  private api = 'http://coachingService.s1910456022.student.kwmhgb.at/api/auth';

  constructor(private http:HttpClient) {

  }

  login(email:string, password:string) : Observable<any>{
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public getCurrentUserId(){
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  public getCurrentUserRole(){
    return Number.parseInt(<string>sessionStorage.getItem("userRole"));
  }

  public setSessionStorage (token:string) {
    const decodedToken = jwt_decode(token) as Token;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
    sessionStorage.setItem("userRole", decodedToken.user.is_coach);
  }

  public logout(){
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userRole');
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
}
