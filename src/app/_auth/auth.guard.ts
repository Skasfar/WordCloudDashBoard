import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private storageService: StorageService, private router:Router, private userService: UserService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.storageService.getUser() != null) {
      const role = route.data['roles'] as Array<string>;

      if (role) {
        const match = this.userService.roleMatch(role);
        if (match) {
          return true;
        } else {
        //  this.router.navigate(['app-forbidden']);
          return true;
        }
      }

    }
    this.router.navigate(['/pages-login']);
    return false;
  }
  
}
