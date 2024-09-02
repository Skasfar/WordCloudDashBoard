import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { AuthGuard } from './_auth/auth.guard';
import { DashBoardComponent } from './pages/dashboard/dash-board/dash-board.component';
import { MapViewComponent } from './pages/dashboard/map-view/map-view.component';

const routes: Routes = [

  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule) },

  { path: '', component: DashBoardComponent },
  
  
  // { path: 'admin-dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['EDITOR'] } },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'map-view', component: MapViewComponent },
  { path: 'pages-error404', component: PagesError404Component },
 //{ path: '', component: PagesLoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
    
  ]
})


export class AppRoutingModule { }
