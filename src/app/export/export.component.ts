import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ExportToCsv } from 'export-to-csv';
import {ExportExcelService} from '../export-excel.service';
import * as PptxGenJS  from 'pptxgenjs-angular';
import domtoimage from 'dom-to-image';
import * as svg from 'save-svg-as-png';

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
  sampleImgEl = null;
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
        this.sampleImgEl = document.getElementById('svg1')
        break;
      case '/table-view':  
        this.sampleData = tableData;
        this.sampleImgEl = document.getElementById('tableView')
        break; 
      case '/bar-chart': 
        this.sampleData = STATISTICS;
        this.sampleImgEl = document.getElementById('svg2')
        break;
      case '/multi-series': 
        this.sampleData = TEMPERATURES;
        this.sampleImgEl = document.getElementById('svg7');
        break;
      case '/pie-chart':
          this.sampleData = POPULATION;
          this.sampleImgEl = document.getElementById('svg5');
          break;
      case '/donut-chart':
        this.sampleData = POPULATION;
        this.sampleImgEl = document.getElementById('svg6');
        break;
      case '/brush-zoom':
        this.sampleData = SP500;
        this.sampleImgEl = document.getElementById('svg4');
        break;
      case '/stacked-bar-chart':
        this.sampleImgEl = document.getElementById('svg3');
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

  

  exportFileAsPpt() {
    this.getData();
    let pptx = new PptxGenJS();
    let slide = pptx.addNewSlide();
    if(this.router.url === '/table-view') {
      domtoimage.toPng(this.sampleImgEl)
      .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          slide.addImage({ data: img.src, x:1, y:1, w:8.0, h:4.0 });
          pptx.save();
      })
      .catch(function (error) {
          console.error('oops, something went wrong!', error);
      });
    }
    else {
      svg.svgAsPngUri(this.sampleImgEl, {}, (uri) => {
        console.log('png base 64 encoded', uri);
        slide.addImage({ data: uri, x:1, y:1, w:8.0, h:4.0 });
        pptx.save();
      });
    }
  }
}
