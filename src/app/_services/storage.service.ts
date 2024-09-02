import { Injectable } from '@angular/core';

const USER_TOKEN  = 'auth-user';
const USER_AUTHORITIES = 'authorities';
const USER_NAME = 'username';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(jwtoken: any, username: string): void {
    //alert(username)
    window.sessionStorage.removeItem(USER_TOKEN);
    window.sessionStorage.setItem(USER_TOKEN, JSON.stringify(jwtoken));
    window.sessionStorage.setItem(USER_NAME, username);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_TOKEN);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public getUserName():string {
    const user = window.sessionStorage.getItem(USER_NAME);
    if (user) {
      
      return user.toString()
    }

    return "";
  }

  public removeUser(): any {
    window.sessionStorage.removeItem(USER_TOKEN);
    window.sessionStorage.removeItem(USER_NAME);
  }

  public setAuthorities(authorities: string []) {
    window.sessionStorage.setItem(USER_AUTHORITIES, JSON.stringify(authorities));
  }

  public getAuthorities(): any{
    const userAuthorities =  window.sessionStorage.getItem(USER_AUTHORITIES);
    if(userAuthorities)
    {
      return JSON.parse(userAuthorities);
    }
    return {};
  }
  
}