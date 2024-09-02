import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PJMR';

  isReviewerRegiForm = false;
  constructor( public _router: Router){
    this._router.events.subscribe((ev) => {

      if (ev instanceof NavigationEnd) {
        this.isReviewerRegiForm  = this._router.url.includes('/reviewer-regi-form');
      }

      
        
      

    });
  }

}
