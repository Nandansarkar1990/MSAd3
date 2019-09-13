import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lineWidth = 400;
  lineHeight = 200;
  barWidth = 400;
  barHeight = 200;
  stackWidth = 400;
  stackHeight = 200;
  constructor() { }

  ngOnInit() {
  }

}
