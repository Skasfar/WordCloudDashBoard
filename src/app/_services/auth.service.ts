import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { StorageService } from './storage.service';


//const AUTH_API = 'http://localhost:8080/api/auth/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
 //baseAPI = 'http://10.1.10.39:8082/CoffeeBoardTest/api/v1/';

 // baseAPI = 'http://103.173.137.133:8083/CoffeeBoardTest/api/v1/';
 //baseAPI = 'http://103.173.137.133:8082/CoffeeBoardTest/api/v1/';

//  baseAPI = 'http://103.173.137.133:8083/CoffeeBoardTest/api/v1/';

   
  //baseAPI = 'http://103.173.137.133:8082/CoffeeBoardDev/api/v1/';
//baseAPI = 'http://localhost:8078/PJMR/api/v1/';
baseAPI = 'http://127.0.0.1:5000/';
// baseAPI = 'http://10.246.139.101/CoffeeBoardDev/api/v1/';


  requestHeader = new HttpHeaders({
    "No-Auth": "True"
  });

  constructor(private http: HttpClient, private storageService: StorageService) { }

  login(username: string, password: string,apiFlag: string='Web'): Observable<any> {
    return this.http.post(
      this.baseAPI + 'authenticate',
      {
        username,
        password,
        apiFlag,
      },
      { headers: this.requestHeader }
      //httpOptions
    );
  }

  getUserAuthorities(): Observable<any> {
    return this.http.get(this.baseAPI + 'getUserDetails', { responseType: 'json' });
  }

  public isLoggedIn(): boolean {

    if (this.storageService.getUser != null) {
      return true;
    }
    return false;
  }



  logout(): any {
    this.storageService.removeUser();
  }

  logoutApi(): Observable<any> {
    return this.http.post<any>(this.baseAPI + 'logout', {})
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getGeneratedSalt() : Observable<any> {

    return this.http.post<any>(this.baseAPI + 'generateSalt', {}, {headers : this.requestHeader})
      .pipe(map((res: any) => {
        return res;
      }))
  }
}