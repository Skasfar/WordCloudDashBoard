import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/_services/dashboard.service';
import * as Highcharts from 'highcharts';
import WordCloud from 'highcharts/modules/wordcloud';


declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

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
  draggedWord: any = null;  // Store the word being dragged
  words: any;

  constructor(private router: Router, private dashBoardService: DashboardService) {}

  ngOnInit() {
    this.initializeChartOptions();
    this.initializeContainers();
    this.getWords();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.enableTextDragging();
    }, 500); // Delay to ensure chart rendering

    this.setupDropZone();
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
          this.makeTextDraggable(textElement.element, point);
        }
      });
    }
  }

  makeTextDraggable(textElement: SVGElement, point: any) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    const dragThreshold = 1; // Minimum drag distance threshold
  
    textElement.addEventListener('mousedown', (event: MouseEvent) => {
      isDragging = true;
      startX = event.clientX;
      startY = event.clientY;
      this.draggedWord = point; 
      event.preventDefault(); // Prevent text selection
    });
  
    document.addEventListener('mousemove', (event: MouseEvent) => {
      if (isDragging) {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
  
        // Only apply the transform if the movement exceeds the threshold
        if (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold) {
          textElement.setAttribute('transform', `translate(${dx}, ${dy})`);
        }
      }
    });
  
    document.addEventListener('mouseup', (event: MouseEvent) => {
      isDragging = false;
      this.checkDropZone(event.clientX, event.clientY); 
    });
  }
  

  // Detect if the word was dropped in the drop zone
  checkDropZone(x: number, y: number) {
    const dropZone = document.querySelector('.drop-zone');
    if (dropZone) {
      const rect = dropZone.getBoundingClientRect();

      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        this.deleteWord(this.draggedWord);

        
      }
    }
  }
  // Deletes the word from the chart
  deleteWord(word: any) {
    const chart = Highcharts.charts[0];
    if (chart) {
      const series = chart.series[0];
      const wordIndex = series.data.indexOf(word);
  
      if (wordIndex !== -1) {
        console.log("Word dropped in bin:", word.name); // Log the actual word's name
        series.data[wordIndex].remove(); // Remove the word from the chart
      }
    }
  }
  
  setupDropZone() {
    const dropZone = document.querySelector('.drop-zone');

    if (dropZone) {
      dropZone.addEventListener('dragover', (event: Event) => {
        event.preventDefault(); // Allow the drop event to fire
      });

      dropZone.addEventListener('drop', (event: Event) => {
        event.preventDefault();
        this.deleteWord(this.draggedWord);
      });
    }
  }

  getWords() {
    this.dashBoardService.getWords().subscribe({
      next: (data: any) => {
        this.words = data;
        console.log("Data received:", data);
      },
      error: (err: { error: { message: any } }) => {
        alert("Error in API access service");
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
