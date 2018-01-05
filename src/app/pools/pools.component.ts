import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { PoolApiService } from '../services/pool-api.service';
import { PoolStoreService } from '../services/pool-store.service';
import { UserService } from '../services/user.service';
import { Pool } from '../models/pool';
import { PoolsAddDialogComponent } from './pools-add-dialog/pools-add-dialog.component';

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.css']
})
export class PoolsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pools: Pool[] = []; // Pools.Default();
  searchResults: Pool[] = [];

  dataSource;// = new MatTableDataSource(this.pools);

  displayedColumns = ['name', 'hashRate', 'miners', 'totalHashes', 'totalBlocksFound', 'lastBlockFoundTime'];

  constructor(
    private poolApiService: PoolApiService,
    private poolStoreService: PoolStoreService,
    private userService: UserService,
    //private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.pools = this.userService.settings.pools;
    this.updateStats();
  }

  ngOnInit() {
    this.pools = this.pools.sort((a, b) => a.miners < b.miners ? 1 : 0);
  }

  updateStats() {
    this.dataSource = new MatTableDataSource(this.pools);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.pools.forEach((pool, index) => {
      this.poolApiService.updatePoolStat(pool);
    });
  }

  /*
  navigate(to: string) {
    this.router.navigate([to]);
  }
  */

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

  // Helper methods to iterate through all the pools.

  getPoolsStats(): Observable<Pool[]> {
    const observableBatch = [];
    this.pools.forEach(pool => {
      observableBatch.push(
        this.poolApiService.getPoolStats(pool.apiUrl)
      );
    });
    return forkJoin(observableBatch);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(PoolsAddDialogComponent, {
      width: '400px',
      data: { name: '', webUrl: '', apiUrl: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      //alert(JSON.stringify(result));
      if (result != null) {
        this.addPool(result.name, result.webUrl, result.apiUrl);
      }
    });
  }

  addPool(name: string, webUrl: string, apiUrl: string) {
    const newpool: Pool = {
      id: 0,
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
    this.poolApiService.getPoolStats(newpool.apiUrl).subscribe(checkresult => {
      this.poolStoreService.addPool(newpool).subscribe(result => {
        this.snackBar.open('Pool added.', 'Ok', {
          duration: 2000,
        });
        this.pools = this.userService.settings.pools;
        this.updateStats();
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
      this.snackBar.open('Pool not added. - ' + error.message, null, {
        duration: 2000,
      });
    });
  }

}
