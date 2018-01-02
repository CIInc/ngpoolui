import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

import { PoolApiService } from '../../services/pool-api.service';
import { PoolStoreService } from '../../services/pool-store.service';
import { UserService } from '../../services/user.service';
import { Pool } from '../../models/pool';
import { Pools } from '../../models/pools';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pool: Pool;

  payments: any;

  dataSource = new MatTableDataSource(this.payments);
  displayedColumns = ['ts', 'hash', 'value', 'fee', 'mixins', 'payees'];

  constructor(
    private poolApiService: PoolApiService,
    private poolStoreService: PoolStoreService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.getPool();
  }

  getPool(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.poolStoreService.getPools().subscribe(pools => {
      this.pool = pools.find(p => p['_id'] === id);
      this.getPayments();
    });
  }

  getPayments() {
    this.poolApiService.getPayments(this.pool.apiUrl).subscribe(blks => {
      this.payments = blks;
      this.dataSource = new MatTableDataSource(this.payments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
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
