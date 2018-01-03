import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

import { PoolApiService } from '../../services/pool-api.service';
import { PoolStoreService } from '../../services/pool-store.service';
import { UserService } from '../../services/user.service';
import { Pools } from '../../models/pools';
import { Pool } from '../../models/pool';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pool: Pool;
  blocks: any;

  dataSource = new MatTableDataSource(this.blocks);
  displayedColumns = ['valid', 'ts', 'height', 'diff', 'shares', 'luck', 'unlocked', 'pool_type'];//, 'hash'

  constructor(
    private poolApiService: PoolApiService,
    private poolStoreService: PoolStoreService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.getPool();
  }

  ngOnInit() {
  }

  getPool(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pool = this.userService.settings.pools.find(p => p['_id'] === id);
    this.getBlocks();
  }
  getBlocks() {
    if (this.pool === undefined) {
      return;
    }
    this.poolApiService.getBlocks(this.pool.apiUrl).subscribe(blks => {
      this.blocks = blks;
      this.dataSource = new MatTableDataSource(this.blocks);
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
