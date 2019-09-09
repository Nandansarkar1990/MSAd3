import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {
  selectedProduct = 'Table';
  selectedObj = null;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  examples = [
    {
      title: 'Table',
      route: '/table-view'
    },
    {
        title: 'Line Chart',
        route: '/line-chart'
    },
    {
        title: 'Multi Series Line Chart',
        route: '/multi-series'
    },
    {
        title: 'Bar Chart',
        route: '/bar-chart'
    },
    {
        title: 'Stacked Bar Chart',
        route: '/stacked-bar-chart'
    },
    {
        title: 'Brush Zoom',
        route: '/brush-zoom'
    },
    {
        title: 'Pie Chart',
        route: '/pie-chart'
    },
    {
        title: 'Donut chart',
        route: '/donut-chart'
    },
  ];

  selectedChart() {
    for (let i=0; i<this.examples.length; i++) {
      if(this.examples[i].title === this.selectedProduct) {
        this.selectedObj = this.examples[i];
      }
    };
    console.log(this.selectedObj);
    this.router.navigate([this.selectedObj.route]);
  }

}
