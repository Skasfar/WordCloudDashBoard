import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
   if(!value)  return null;
   if(!args) return value;

   args = args.toLowerCase();
    
  
   return value.filter((item: any)=>{

    //console.log(item);
    
    if(item.applicationId){
      return JSON.stringify(item.applicationId).toLowerCase().includes(args);
    }
   
    //Added by Anuradha on 06-06-2023 for search bar
    if (item.trainingId || item.trainingName) {
      const lowercasedTrainingId = JSON.stringify(item.trainingId).toLowerCase();
      const lowercasedTrainingName = item.trainingName.toLowerCase();
      console.log(item.trainingId)
      return lowercasedTrainingId.includes(args) || lowercasedTrainingName.includes(args);
    }
    
    return JSON.stringify(item).toLowerCase().includes(args);
   })
  }

}

