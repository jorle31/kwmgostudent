import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "./shared/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToUserSpacesGuard implements CanActivate {

  constructor(
    private authService : AuthenticationService,
    private router : Router,
    private route : ActivatedRoute
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn()){
      if(state.url === '/user/services' && this.authService.getCurrentUserRole() === 0){
        return true;
      }
      else if (state.url === '/user/services_saved' || state.url === '/user/services_booked'){
        if(this.authService.getCurrentUserRole() === 1){
          return true;
        }
        else{
          window.alert('Bitte loggen sie sich als Student ein um diesen Bereich zu nutzen!');
          this.router.navigate(['../'], {relativeTo: this.route});
          return false;
        }
      }else{
        window.alert('Bitte loggen sie sich als Coach ein um diesen Bereich zu nutzen!');
        this.router.navigate(['../'], {relativeTo: this.route});
        return false;
      }
    }
    else{
      window.alert('Bitte loggen sie sich ein um diesen Bereich zu nutzen!');
      this.router.navigate(['../'], {relativeTo: this.route});
      return false;
    }
  }

  getResolvedUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map(v => v.url.map(segment => segment.toString()).join('/'))
      .join('/');
  }

  getConfiguredUrl(route: ActivatedRouteSnapshot): string {
    return '/' + route.pathFromRoot
      .filter(v => v.routeConfig)
      .map(v => v.routeConfig!.path)
      .join('/');
  }
}
