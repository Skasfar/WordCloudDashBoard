import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from "@angular/google-maps";



@Component({
  selector: 'app-map-view',
  // standalone: true,
  // imports: [GoogleMapsModule],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements OnInit, AfterViewInit {
  weight:any;
  @ViewChild(GoogleMap, { static: false }) googleMap!: GoogleMap;

  options: google.maps.MapOptions = {
    center: { lat: 12.9716, lng: 77.5946 },  // Center of Karnataka
    zoom: 6,  // Adjust zoom level as needed
  };

  gramaPanchayats = [
    { name: 'Panchayat 1', lat: 12.9715987, lng: 77.5945627 },
    { name: 'Panchayat 2', lat: 15.3172775, lng: 75.7138884 },
  ];

  ngOnInit(): void {
   
    this.weight = history.state.weight;
    console.log("this.weight: "+this.weight)
  }

  ngAfterViewInit(): void {
    this.addMarkers();
  }

  addMarkers() {
    const mapInstance = this.googleMap.googleMap;
    if (mapInstance) {
      this.gramaPanchayats.forEach(panchayat => {
        new google.maps.Marker({
          position: new google.maps.LatLng(panchayat.lat, panchayat.lng),
          title: panchayat.name,
          map: mapInstance,
        }).addListener('click', () => {
          console.log(`${panchayat.name} clicked!`);
        });
      });
    } else {
      console.error('Google Map instance is not available.');
    }
  }

}

  
  // options: google.maps.MapOptions = {
  //    center: { lat: -31, lng: 147 },
  //    zoom: 4,
  //  };
 
  //  options: google.maps.MapOptions = {
  //    center: { lat: 12.9716, lng: 77.5946 },  // Center of Karnataka
  //    zoom: 7,  // Adjust zoom level as needed
  // };

  // // markers: google.maps.MarkerOptions[] = [];

  // markers: google.maps.MarkerOptions[] =[];

  // // Define zillaPanchayats and gramaPanchayats as instance variables
  // zillaPanchayats = [
  //   {
  //     name: 'Bangalore Urban',
  //     center: { lat: 12.9716, lng: 77.5946 } as google.maps.LatLngLiteral
  //   },
  //   {
  //     name: 'Mysore',
  //     center: { lat: 12.2958, lng: 76.6394 } as google.maps.LatLngLiteral
  //   },
  //   // Add more Zilla Panchayats...
  // ];

  // gramaPanchayats = [
  //   {
  //     name: 'Kumbalgodu',
  //     zillaPanchayat: 'Bangalore Urban',
  //     center: { lat: 12.8967, lng: 77.4474 } as google.maps.LatLngLiteral
  //   },
  //   {
  //     name: 'Srirampura',
  //     zillaPanchayat: 'Mysoreeeee',
  //     center: { lat: 12.3018, lng: 76.6507 } as google.maps.LatLngLiteral
  //   },
  //   // Add more Grama Panchayats...
  // ];

  // ngOnInit(): void {
  //   this.addMarkers();
  // }

  // addMarkers() {
  //   // Add Zilla Panchayat markers
  //   this.zillaPanchayats.forEach(zp => {
  //     if (zp.center) {
  //       this.markers.push({
  //         position: zp.center,
  //         title: zp.name,
  //         icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  //       });
  //     }
  //   });

  //   // Add Grama Panchayat markers
  //   this.gramaPanchayats.forEach(gp => {
  //     if (gp.center) {
  //       this.markers.push({
  //         position: gp.center,
  //         title: `${gp.name} (${gp.zillaPanchayat})`,
  //         icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  //       });
  //     }
  //   });
  // }
