import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { Pool } from '../pool';

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.css']
})
export class PoolsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pools: Pool[] = [
    {
      id: 1,
      name: 'XMRPool.net',
      api_url: 'https://api.xmrpool.net'
    },
    {
      id: 2,
      name: 'supportXMR.com',
      api_url: 'https://supportxmr.com/api'
    },
    {
      id: 3,
      name: 'ViaXMR.com',
      api_url: 'https://api.viaxmr.com'
    },
    {
      id: 4,
      name: 'Moria Mining Pool',
      api_url: 'https://api.moriaxmr.com'
    },
    {
      id: 5,
      name: 'Monero Ocean',
      api_url: 'https://api.moneroocean.stream'
    },
  ];

  dataSource = new MatTableDataSource(this.pools);

  displayedColumns = ['id', 'name', 'api_url'];

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
