import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

import { PoolApiService } from '../services/pool-api.service';
import { Pools } from '../models/pools';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pools = Pools.Default();
  payments: any;

  dataSource = new MatTableDataSource(this.payments);
  displayedColumns = ['ts', 'hash', 'value', 'fee', 'mixins', 'payees'];

  constructor(private poolApiService: PoolApiService) {
    this.poolApiService.getPayments(this.pools[0]).subscribe(blks => {
      this.payments = blks;
      this.dataSource = new MatTableDataSource(this.payments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
