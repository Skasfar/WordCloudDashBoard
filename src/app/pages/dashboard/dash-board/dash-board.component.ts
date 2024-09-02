import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import * as Highcharts from 'highcharts';
import Histogram from 'highcharts/modules/histogram-bellcurve';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import WordCloud from 'highcharts/modules/wordcloud';
import { HighchartsChartModule } from 'highcharts-angular';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/_services/dashboard.service';


declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

Histogram(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
const Wordcloud = require('highcharts/modules/wordcloud');


Wordcloud(Highcharts);
@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options[] = [];
  containers: any[] = []; // Define containers property

  constructor(private router: Router, private dashBoardService: DashboardService) {

  }
  ngOnInit() {
    this.initializeChartOptions();
    this.initializeContainers();
    this.getWords();
  }

  initializeChartOptions() {
    this.chartOptions = [

      {
        series: [{
          type: 'wordcloud',
          data: [
            { name: 'ಹೊಸ', weight: 5 },
            { name: 'ଓଡ଼ିଆ', weight: 6 },
            { name: 'தமிழ்', weight: 8 },
            { name: 'తెలుగు', weight: 7 },
            { name: 'CSS', weight: 6 },
            { name: 'Highcharts', weight: 5 },
            { name: 'বাংলা', weight: 9 },
            { name: 'Development', weight: 3 },
            { name: 'Web', weight: 2 },
            { name: 'App', weight: 1 },
            { name: 'भोजपुरी', weight: 5 },
            { name: 'TypeScript', weight: 2 },
            { name: 'JavaScript', weight: 2 },
            { name: 'HTML', weight: 2 },
            { name: 'CSS', weight: 2 },
            { name: 'Highcharts', weight: 2 },
            { name: 'Framework', weight: 2 },
            { name: 'Development', weight: 2 },
            { name: 'Web', weight: 3 },
            { name: 'App', weight: 3 }

          ],
          events: {
            click: (event: any) => {
              const point = event.point;
              this.onWordClick(point.options.weight);
            }
          },
          spiral: 'archimedean',
          // rotation: {
          //   from: 20,
          //   to: 90
          // },
          name: 'Word Cloud',
          style: {
            fontFamily: 'Arial',
            fontWeight: 'bold'
          }


        }],
        chart: {
          backgroundColor: 'transparent',
          // backgroundColor: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'
          // backgroundColor: 'linear-gradient(180.3deg, rgb(214, 224, 255) 37.2%, rgb(254, 168, 168) 137.3%)'
        },
        plotOptions: {
          wordcloud: {
            // rotation: {
            //   from: 0,
            //   to: 0
            // }
          }
        }
      },
    ];
  }



  // initializeChartOptions() {
  //   this.dashBoardService.getWords().subscribe({
  //     next: (data: any) => {
  //       this.words = data;
  
  //       this.chartOptions = [
  //         {
  //           series: [{
  //             type: 'wordcloud',
  //             data: this.words.map((word: any) => {
  //               return { name: word.word, weight: word.frequency };
  //             }),
  //             events: {
  //               click: (event: any) => {
  //                 const point = event.point;
  //                 this.onWordClick(point.options.weight);
  //               }
  //             },
  //             spiral: 'archimedean',
  //             name: 'Word Cloud',
  //             style: {
  //               fontFamily: 'Arial',
  //               fontWeight: 'bold',
                
  //             }
  //           }],
  //           chart: {
  //             backgroundColor: 'transparent',
  //           },
  //           plotOptions: {
  //             wordcloud: {
  //               // Other plot options if necessary

  //             }
  //           }
  //         },
  //       ];
        
  //       console.log("Chart options initialized with dynamic data:", this.words);
  //     },
  //     error: (err: { error: { message: any; }; }) => {
  //       alert("Error in API access service");
  //     }
  //   });
  // }



  words:any;
  getWords() {
    this.dashBoardService.getWords().subscribe({
      next: (data: any) => {
       this.words = data;
       console.log("jok",data);
      },
      error: (err: { error: { message: any; }; }) => {
        alert("error in api access service");

      }

    })
  }

  initializeContainers() {
    this.containers = [1];
  }



  onWordClick(weight) {
    this.router.navigate(['map-view'], { state: { "weight": weight } });
  }




}
