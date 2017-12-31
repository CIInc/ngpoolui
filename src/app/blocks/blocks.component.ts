import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

import { PoolApiService } from '../pool-api.service';
import { Pools } from '../models/pools';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pools = Pools.Default();
  blocks: any;

  dataSource = new MatTableDataSource(this.blocks);
  displayedColumns = ['valid', 'ts', 'height', 'diff', 'hash', 'shares', 'luck', 'unlocked', 'pool_type'];

  constructor(private poolApiService: PoolApiService) {
    this.poolApiService.getBlocks(this.pools[0]).subscribe(blks => {
      this.blocks = blks;
      this.dataSource = new MatTableDataSource(this.blocks);
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
