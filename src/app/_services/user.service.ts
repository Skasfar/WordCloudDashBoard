import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userRoles: string[] = [];
  authObject: any;
  roles: string[] = [];
  constructor(private http: HttpClient, private authService: AuthService, private storageService: StorageService) { }





  
  getUserDetails(): Observable<any> {

    return this.http.get(this.authService.baseAPI + 'getUserDetails', { responseType: 'json' });
  }
  
  public roleMatch(allowedRoles: any): any {
    let isMatch: boolean = false;
    //alert("allowed roles from page: " + allowedRoles);
    const userRoles: any = this.storageService.getAuthorities();
    this.authObject = userRoles[0];
    this.roles = this.authObject.authority;


    //alert("allowed roles from getuserAutho: " +  this.authObject.authority);
    try {
      if (userRoles != null && userRoles) {
        for (let i = 0; i < userRoles.length; i++) {
          //alert("for loop: " +  userRoles.length);
          for (let j = 0; j < allowedRoles.length; j++) {
            //alert("for loop: " +  allowedRoles.length);
            if (this.authObject.authority === allowedRoles[j]) {
              isMatch = true;
             
              return isMatch;
            } else {
              
              return isMatch;
            }
          }
        }
      }
    } catch (err) {
      throw (err)
    }
  }


  getPermissionsList(): Observable<any> {
    return this.http.get(this.authService.baseAPI + 'getPrivileges', { responseType: 'json' });
  }
}
