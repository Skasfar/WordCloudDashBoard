import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, Observable, retry, throwError } from 'rxjs';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { LoaderService } from '../_services/loader.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  static accessToken: String = '';

  constructor(private storageService: StorageService, private router: Router, public loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.loaderService.isLoading.next(true);
    //alert("in intercepter");
    
    if (request.headers.get('No-Auth') === 'True') {
      //alert("in requst no auth");
      return next.handle(request.clone());
    }
    //alert("request has expired" + request.headers.has('expired'));
    //  if (request.headers.has('TokenExpired')) {
    //   alert("in requst token expried");
    //   this.router.navigate(['pages-login']);
    // }
    // if (request.body.error === 'Expired') {
    //   alert("in requst header token expired");
    //   this.router.navigate(['pages-login']);
    // }


    
    const token = this.storageService.getUser();

    request = this.addToken(request, token);

    console.log("accessToken call in intercepter", 'Bearer ' + this.storageService.getUser());

    return next.handle(request).pipe(
      finalize(
        () => {
          this.loaderService.isLoading.next(false);
        }

      ),
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err.status);
          if (err.status === 401) {
            this.router.navigate(['pages-login']);
          } else if (err.status === 403) {
            this.router.navigate(['/app-forbidden']);
          }
          else if (err.status === 412) {
           // alert("Access Token has expired: Redirecting to Login Page");
            this.router.navigate(['pages-login']);
          }
        
          return throwError("Some thing is wrong");
        }
      )
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];