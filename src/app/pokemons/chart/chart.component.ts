import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent {
  @Input() stats: ChartDataSets[] = [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{ }],
      yAxes: [{
        ticks: {
          min: 0,
          suggestedMax: 110,
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    maintainAspectRatio: true
  };

  barChartLabels: Label[] = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'];

  barChartType: ChartType = 'bar';

  barChartLegend = true;

  barChartPlugins = [pluginDataLabels];

  constructor() { }
}
