import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ExportToCsv } from 'export-to-csv';
import {ExportExcelService} from '../export-excel.service'

import { tableData } from '../shared/table'
import { STOCKS } from '../shared';
import { STATISTICS } from '../shared';
import { TEMPERATURES } from '../shared';
import { POPULATION } from '../shared';
import { SP500 } from '../shared';
import { SAMPLE_DATA } from '../shared/data04';




@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  filename = 'demo.csv'
  sampleData = [];
  options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: '',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
  constructor(public router: Router, private excelService: ExportExcelService) { }

  ngOnInit() {
  }

  public getData() {
    switch(this.router.url) { 
      case '/line-chart': 
        this.sampleData = STOCKS;
        break;
      case '/table-view':  
        this.sampleData = tableData;
        break; 
      case '/bar-chart': 
        this.sampleData = STATISTICS;
        break;
      case '/multi-series': 
        this.sampleData = TEMPERATURES;
        break;
      case '/pie-chart':
      case '/donut-chart':
        this.sampleData = POPULATION;
        break;
      case '/brush-zoom':
        this.sampleData = SP500;
        break;
      default: { 
         //statements; 
         break; 
      } 
   } 
  }

  exportFileAsCsv() {
    this.getData();
    const csvExporter = new ExportToCsv(this.options);
    csvExporter.generateCsv(this.sampleData);
  }

  exportFileAsExcel() {
    this.getData();
    this.excelService.exportAsExcelFile(this.sampleData, 'excelFile');
  }
}
