import { Component, OnInit } from '@angular/core';
import {ResControlElement} from './reservation-control.interface'

@Component({
  selector: 'app-reservation-control',
  templateUrl: './reservation-control.component.html',
  styleUrls: ['./reservation-control.component.scss']
})
export class ReservationControlComponent implements OnInit {
  tableDataOriginal: Array<any>;
  tableData: Array<any>;
  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;

  constructor() { }

  ngOnInit() {
    const that=this;
    that.tableDataOriginal=ResControlElement;
    that.tableData=ResControlElement;
  }

  loadData() {
    this.tableData = this.tableDataOriginal;
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

}
