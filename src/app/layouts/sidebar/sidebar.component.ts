import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isAuthenticated = false;
  officeId!: number;
  errorMessage:any;
  constructor(private authService: AuthService, private router: Router, public userService: UserService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
   // this.getUserInfo();
  }
}
