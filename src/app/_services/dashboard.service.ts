import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient , private authService: AuthService) { }

private apiKey = 'AIzaSyArtNugmCyCrnq1Ae8DpRDn4HJJeP1Hd54';
private apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

getCoordinates(placeName: string): Observable<{ lat: number; lng: number }> {
  alert("placeName")
  const url = `${this.apiUrl}?address=${encodeURIComponent(placeName)},Karnataka,India&key=${this.apiKey}`;
  return this.http.get(url).pipe(
    map((response: any) => {
      if (response.status === 'OK' && response.results.length > 0) {
        const location = response.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error('Location not found');
      }
    })
  );
}



getWords(): Observable<any> {
  return this.http.get(this.authService.baseAPI + 'top-words', { responseType: 'json' });
}


}
