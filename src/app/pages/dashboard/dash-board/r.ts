import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/_services/dashboard.service';
import * as Highcharts from 'highcharts';
import WordCloud from 'highcharts/modules/wordcloud';
import Histogram from 'highcharts/modules/histogram-bellcurve';

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

Histogram(Highcharts);
WordCloud(Highcharts);

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements AfterViewInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options[] = [];
  containers: any[] = [];

  constructor(private router: Router, private dashBoardService: DashboardService) {}

  ngOnInit() {
    this.initializeChartOptions();
    this.initializeContainers();
    this.getWords();
  }

  ngAfterViewInit() {
    // Enable dragging for the text elements in the Word Cloud after the chart is rendered
    setTimeout(() => {
      this.enableTextDragging();
    }, 500); // Delay to ensure chart rendering
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
            { name: 'App', weight: 1 }
          ],
          events: {
            click: (event: any) => {
              const point = event.point;
              this.onWordClick(point.options.weight);
            }
          },
          spiral: 'archimedean',
          name: 'Word Cloud',
          style: {
            fontFamily: 'Arial',
            fontWeight: 'bold'
          }
        }],
        chart: {
          backgroundColor: 'transparent',
        }
      }
    ];
  }

  enableTextDragging() {
    const chart = Highcharts.charts[0]; // Assuming it's the first chart instance
    if (chart) {
      chart.series[0].data.forEach((point: any) => {
        const textElement = point.graphic; // Access the word's SVG element

        if (textElement && textElement.element) {
          this.makeTextDraggable(textElement.element);
        }
      });
    }
  }

  makeTextDraggable(textElement: SVGElement) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    textElement.addEventListener('mousedown', (event: MouseEvent) => {
      isDragging = true;
      startX = event.clientX;
      startY = event.clientY;
      event.preventDefault(); // Prevent text selection
    });

    document.addEventListener('mousemove', (event: MouseEvent) => {
      if (isDragging) {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        textElement.setAttribute('transform', `translate(${dx}, ${dy})`);
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  }

  getWords() {
    this.dashBoardService.getWords().subscribe({
      next: (data: any) => {
        this.words = data;
        console.log("jok", data);
      },
      error: (err: { error: { message: any } }) => {
        alert("error in API access service");
      }
    });
  }

  initializeContainers() {
    this.containers = [1];
  }

  onWordClick(weight: any) {
    this.router.navigate(['map-view'], { state: { "weight": weight } });
  }
}
