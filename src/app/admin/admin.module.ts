import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
  
    
  ],
  imports: [
    AdminRoutingModule,
   
  ],
  exports: [
    AdminDashboardComponent,
  
  ]
})
export class AdminModule { }

