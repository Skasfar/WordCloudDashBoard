import { Component , Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { LoaderService } from 'src/app/_services/loader.service';
import { UserService } from 'src/app/_services/user.service';
import { AdminService } from 'src/app/_services/admin.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userInfo: any;
  errorMessage: any;

  constructor(@Inject(DOCUMENT) private document: Document, public loaderService: LoaderService, private authService: AuthService, private router: Router, private userService: UserService,
  private adminService:AdminService) { }

  
  ngOnInit(): void {
 
    //this.getAllNotification();
    this.getUserDetailsList();

  }

  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

// Created By Dilip 16-1-23
  logout() {
    this.authService.logoutApi()
      .subscribe({
        next: (res) => {
         this.onLogout();
          alert(res.message);
        },
        error: (e) => {
          alert(e.error);
        }
      });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['pages-login']).then(() => window.location.reload());;
  }

  getUserDetailsList() {
    this.userService.getUserDetails().subscribe({

      next: data => {

        this.userInfo = data;
       
       
      },
      error: err => {
        alert("error in api access service");
        this.errorMessage = err.error.message;
      }
    });
  }

  notificationData:any;

  updateUserNotificationsIsReadTrue(a){

  }
  messageData:any;
  updateMessageIsReadTrue(msg){}



  
  markAsUnread:any[] = [];
  // getAllNotification(){
  //   this.adminService.getAllNotification().subscribe({
  //     next: data=>{
  //       this.notificationData=data;
  //       console.log("All data:  ",this.notificationData);

  //       this.markAsUnread=this.notificationData.filter(msg => msg.markAsRead==1);
  //       this.markAsUnreadCount=this.markAsUnread.length
  //     },
  //     error: err => {
  //       alert("error in api access service");
  //       this.errorMessage = err.error.message;
  //     }
  //   })
  // }

  displayStyleOfModal2 = "none";
  allNotifications: any[] = [];


  viewAllNotifications(){
   // alert("Kavya")
    this.allNotifications = this.notificationData;
    this.displayStyleOfModal2 = "block";

  }

  closeNotification() {
    this.displayStyleOfModal2 = "none";
  }
  markAsUnreadCount:number=0;

  markAsRead(notification: any, index: number) {
    // this.adminService.updateMarkAsRead(notification.nid).subscribe(
    //   (res: any) => {
    //     this.allNotifications[index].markAsRead = 1;
    //     this.markAsUnreadCount--;
    //     console.log(this.markAsUnreadCount);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }




}

