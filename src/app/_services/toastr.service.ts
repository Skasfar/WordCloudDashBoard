import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor() { }

  saveToastr(respType: string, respMsg: string) {
    if (respType.toLowerCase() == 'success') {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: respMsg,
        showConfirmButton: false,
        timer: 1500
      })

    } else if (respType.toLowerCase() == 'error') {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: respMsg,
        showConfirmButton: false,
        timer: 1500
      })
    } else if (respType.toLowerCase() == 'info') {

      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Successfully Updated category',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }



  beforeDeleteToastr(beforDeleteRemarks: any, confirmButtonText: any): Promise<boolean> {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Are you sure?',
        text: beforDeleteRemarks,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true); // User clicked "Yes, delete it!"
        } else {
          resolve(false); // User clicked Cancel or closed the dialog
        }
      });
    });
  }



  afterDelete(respType: string, title: string, text: string): Promise<boolean> {
    if (respType.toLowerCase() == 'success') {
      return new Promise((resolve) => {
        Swal.fire({
          title: title,
          text: text,
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            resolve(true); // User clicked "Yes, delete it!"
          } else {
            resolve(false); // User clicked Cancel or closed the dialog
          }

        })
      });
    } else{
      return Promise.resolve(false);
    }
  }
}