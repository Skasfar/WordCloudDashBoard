import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthGuard } from './_auth/auth.guard';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashBoardComponent } from './pages/dashboard/dash-board/dash-board.component';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GoogleMapsModule } from "@angular/google-maps";
import { MapViewComponent } from './pages/dashboard/map-view/map-view.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        PagesLoginComponent,
        ForbiddenComponent,
        PagesError404Component,
        DashBoardComponent,
        MapViewComponent,
        


    ],
    bootstrap: [AppComponent],
    imports: [FormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatDatepickerModule,
        HighchartsChartModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        CommonModule,
        MatNativeDateModule,
        GoogleMapsModule,
       
        


    ],
    providers: [AuthGuard, httpInterceptorProviders, provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
