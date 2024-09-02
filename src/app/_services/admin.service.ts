import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient, private authService :AuthService) { }


  getAllNotification() {
    return this.http.get(this.authService.baseAPI + 'getAllNotification', { responseType: 'json' });
  }

  
  saveReviewerForm(data: any): Observable<any> {
  return this.http.post<any>(this.authService.baseAPI + 'saveEvent', data, { responseType: 'json' } );
}
}
