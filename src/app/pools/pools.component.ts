import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';

import { PoolApiService } from '../pool-api.service';
import { PoolStoreService } from '../pool-store.service';
import { Pool } from '../models/pool';
import { Pools } from '../models/pools';

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.css']
})
export class PoolsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pools = Pools.Default();

  searchResults: Pool[] = [];

  dataSource = new MatTableDataSource(this.pools);
  displayedColumns = ['name', 'hashRate', 'miners', 'totalHashes', 'lastBlockFoundTime', 'totalBlocksFound'];

  poolName = new FormControl('', [Validators.required]);
  poolWebUrl = new FormControl('');
  poolApiUrl = new FormControl('', [Validators.required]);

  constructor(private poolApiService: PoolApiService, private poolStoreService: PoolStoreService, public snackBar: MatSnackBar) {
    this.poolStoreService.getPools().subscribe(pools => {
      this.pools = pools;
      this.updateStats();
    }, error => {
      if (error.status === 500) {
      }
      this.updateStats();
      this.snackBar.open(error.message, null, {
        duration: 2000,
      });
    });
  }

  ngOnInit() {
  }

  updateStats() {
    this.dataSource = new MatTableDataSource(this.pools);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.pools.forEach((pool, index) => {
      this.updateStat(pool);
    });
  }
  updateStat(pool: Pool) {
    this.poolApiService.getStats(pool).subscribe(result => {
      pool.hashRate = result.pool_statistics.hashRate;
      pool.miners = result.pool_statistics.miners;
      pool.totalHashes = result.pool_statistics.totalHashes;
      pool.lastBlockFoundTime = new Date(result.pool_statistics.lastBlockFoundTime * 1000);
      pool.lastBlockFound = result.pool_statistics.lastBlockFound;
      pool.totalBlocksFound = result.pool_statistics.totalBlocksFound;
      pool.totalMinersPaid = result.pool_statistics.totalMinersPaid;
      pool.totalPayments = result.pool_statistics.totalPayments;
      pool.roundHashes = result.pool_statistics.roundHashes;
    });
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
/*
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
*/

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  search(searchValue: string) {
    this.poolApiService.searchPaymentAddress(searchValue)
    .subscribe(results => {
      const pools = [];
      results.forEach((result, index) => {
        if (result != null && result['totalHashes'] !== undefined) {
          pools.push(this.pools[index]);
        }
      });
      this.dataSource = new MatTableDataSource(pools);
      /*
      this.snackBar.open('Search returned ' + pools.length + ' pools with this address', 'ok', {
        duration: 1000,
      });
      */
    });
  }

  add(name: string, webUrl: string, apiUrl: string) {
    const newpool: Pool = {
      name: name,
      webUrl: webUrl,
      apiUrl: apiUrl,
      hashRate: 0,
      miners: 0,
      totalHashes: 0,
      lastBlockFoundTime: null,
      lastBlockFound: 0,
      totalBlocksFound: 0,
      totalMinersPaid: 0,
      totalPayments: 0,
      roundHashes: 0
    };
    this.poolApiService.getStats(newpool).subscribe(checkresult => {
      this.poolStoreService.addPool(newpool).subscribe(result => {
        this.snackBar.open('Pool added.', 'Ok', {
          duration: 2000,
        });
        this.clearRegistrationForm();
        this.poolStoreService.getPools().subscribe(pools => {
          this.pools = pools;
          this.updateStats();
        });
      }, error => {
        if (error.status === 500) {
        }
        this.snackBar.open(error.message, null, {
          duration: 2000,
        });
      });
    }, error => {
      if (error.status === 500) {
      }
      this.snackBar.open('Pool not added. ' + error.message, null, {
        duration: 2000,
      });
    });
  }

  getErrorMessage() {
    return this.poolName.hasError('required') ? 'You must enter a value' :
        // this.poolName.hasError('email') ? 'Not a valid email' :
            '';
  }

  clearRegistrationForm() {
    
  }
}
