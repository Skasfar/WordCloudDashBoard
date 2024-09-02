
import { AbstractControl } from "@angular/forms";
import { Deserializable } from "./Deserializable";

export class AppUserDto {


    username!: String;
    firstName!: String;
    lastName!: String;
    mobileNumber!: String;
    email!: String;
    accessLevel!: number;

}

export class MstRole {
    roleName: String = '';
    levelId: number = 0;

}
export class SubOperationCalender {
    
    id: number = 0;
    subOperationMonth: String = '';
    subOperationSno: number = 0;
    subOperationDesc: string = '';
    subOperationVlink: string = '';

    farmCalendarOperation: any = {
        id: '',
        
    }
    farmCalendarType: any = {
        id: ''
    }
}

export class FarmCalendarType {
    id: number = 0;
}

export class FarmCalendarOperation {
    id: number = 0;
    
}

export class ServiceNameCost {
    cbServiceId:number=0;
    serviceName: String = '';
    serviceDesc: number = 0;
    serviceCostGu: number = 0;
    serviceCostOu: number = 0;
    maxLimit: number = 0;
    isPaymentApprovalRequired : number = 0;
    isApprovalRequired:number=0;
    isSamplesRequired : number = 0;
    status: number = 0;
  
    serviceCategory: any = {
        id: ''
      }

    

}

export class serviceCategory {
    id: number=0;  
}

export class MstCalender {
    id:number=0;
    
    operationDesc: String = '';
    operationSno: number = 0;
    farmCalendarType: any=({
    id: '',
       
      })
    }

    export class AddProduct {

        id:number=0;
        categoryId:number=0;
        productName: String = '';
        productDiscription: String = '';
        productPrice:number=0;
        productWeight:number=0;
        unitsInStock:number=0;
        // productImage:
        
    
    }

    export class AssignPermissions {

       
        mappingId:number=0;
        roleId: number=0;
        privilegeId: number=0;

    }


    export class AssignServices{
        id:number=0;
        officeId:number=0;
        serviceId:number=0;


    }

    //AssignRole By Dilip
    export class AssignRole {
        mappingId: number=0;
        userId: number=0;
        roleId: number=0;  
    }


    //AssignService By Dilip
    export class AssignService {
        id: number=0;
        officeId: number=0;
        serviceId: number=0;  
    }


    //Service-sub-type By Dilip
    export class ServiceSubType {
        id:number=0;
        cbServiceId: number = 0;
        serviceCategoryName:String = '';
        serviceCategoryDesc: String = ''; 
        serviceType: any=({
            id: '',  
          }) 
    }



    export class AddServicetype{
        id:number=0;
        serviceTypeId: number = 0;
        serviceTypeName:String = '';
        serviceTypeDesc: String = '';
      
       
    
       }



       //gowthami

    export class AssignCategory{

        categoryId:number=0;
        categoryName: String = '';
        categoryDiscription: String = '';
        status: number = 0;
    
       }


       //20-01-2023  Gowthami  
       export class Trainingnamecost {

        trainingId: number = 0;
    
        trainingDesc: String = '';
        minNumberOfParticipants: String = '';
        maxNumberOfParticipants: String = '';
        address: String = '';
        startDate: number = 0;
        endDate: number = 0;
        applyCutOffDate: number = 0;
    
        cbService: any = {
            cbServiceId: ''
        }
        cbServiceId: number = 0;
    }
    
    
    export class CbService {
        cbServiceId: number = 0;
    }

    // office Detials 18-05-2023
    export class OfficeDetailsList{
        id:number =0;
        officeName:String ='';
        officeDesc:String='';
        officeType:any = {
            id:''
        }
        officeCategory:any = {
            id:''
        }
        parentDepartment:any={
            id:''
        }
        officeCode:String=''
        reportHeaderLine1:String=''
        reportHeaderLine2:String=''
        reportHeaderLine3:String=''
    }
    
    //pavithra 11-1-2023
    ///password validation
// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl) => {
        const control = group.get(controlName);
        const matchingControl = group.get(matchingControlName);

        if (!control || !matchingControl) {
            return null;
        }

        // return if another validator has already found an error on the matchingControl
        if (matchingControl.errors && !matchingControl.errors["mustMatch"]) {
            return null;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    }



    





    
}
