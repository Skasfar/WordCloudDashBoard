import { Component,  OnInit } from '@angular/core';
import { StorageService } from '../../_services/storage.service';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../../_models/AuthenticationResponse';
import { FormBuilder, Validators } from '@angular/forms';
import { crypt } from 'src/assets/js/passwordEncrypt';
import { HttpRequestInterceptor } from 'src/app/_helpers/http.interceptor';
import { callJSFun } from 'src/assets/js/captcha.js';
import { sendThis } from 'src/assets/js/captcha.js';


@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {

  authenticationResponse = new AuthenticationResponse();

  

  company = 'ICT Infracon LLP';

  form: any = {
    username: null,
    password: null
  };

  parsedJson: any;
  userAuthorities: string[] = [];
  authObject: any;
  roles: string[] = [];
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  saltPrev = "";
  saltEnd = ""


  constructor(private authService: AuthService, private storageService: StorageService, private router: Router , private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    
    callJSFun();
    

    this.authService.getGeneratedSalt().subscribe({
      
      next : (data:any) =>{
        console.log(data);

        this.saltPrev = data["hgdhgsdhsqqkq"]
        this.saltEnd = data["hgdhgsdvoidhsqq"]

        //console.log(`dsfasda`, this.saltPrev, this.saltEnd)
      }
    } );
    
    
    this.form = this.formBuilder.group({

      username: ['', Validators.required],
      password:['', Validators.required],
   
   })
   //pavithra 10-1-2023
   this.form.setError({unauthenticated:true})
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  login(): void {


    

    const { username, password } = this.form;

    if ( sendThis() != 1) {
      return ;
    }

    const encryptedPassword = `${this.saltPrev}${crypt(password)}${this.saltEnd}`;

    
  
    this.authService.login(username, encryptedPassword).subscribe({

     
      next: response => {
   

        Object.assign(this.authenticationResponse, response)

        // console.log("both",JSON.stringify(response));
        // console.log("jwtoken", this.authenticationResponse.jwtoken);
        //console.log("refreshToken",this.authenticationResponse.refreshToken);

        HttpRequestInterceptor.accessToken = this.authenticationResponse.jwtoken;
     

        this.storageService.saveUser(this.authenticationResponse.jwtoken, username);
       
        this.setUserAuthorites();
        

      }
      ,
      error: err => {
        alert("Please Enter Correct Password");
        this.form.setErrors({ unauthenticated: true });
        console.log(err)
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.reloadPage();    
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  setUserAuthorites(): any {
    this.authService.getUserAuthorities().subscribe({
      next: response => {
        console.log("data" + JSON.stringify(response))
        this.userAuthorities = response.authorities;
        this.storageService.setAuthorities(this.userAuthorities);
       
        console.log("userAuthorities" + JSON.stringify(this.userAuthorities))
        console.log("Authorities at 0: " + JSON.stringify(this.userAuthorities[0]));
        if(this.userAuthorities != null)
        {
          this.authObject = this.userAuthorities[0];
          if(this.authObject != null)
          {
            this.roles =  this.authObject.authority;
          }
          
        }
        
        console.log("Role at 0: " + JSON.stringify(this.roles));
        const role = JSON.stringify(this.roles);
        
        if ( role != null && role.match("EDITOR")) {
          this.isLoginFailed = false;
          
          this.router.navigate(['admin-dashboard']).then(() => window.location.reload());
        }
        
        else if( role != null && role.match("AUTHOR")){
          this.isLoginFailed = false;
          this.router.navigate(['author']).then(() => window.location.reload());
        }else if ( role != null && role.match("REVIEWER")  ){
          this.isLoginFailed = false;

          this.router.navigate(['journal']).then(() => window.location.reload());
        }

      },
      error: err => {
      
        console.log(err);
        this.errorMessage = err.error.message;
        return false;
      }
    });
  }
//ragupathi add eye toggle password 10-03-2023
  showOldPassword = false;
 

  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }
}

