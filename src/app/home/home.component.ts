import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { resetFakeAsyncZone } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { PoolApiService } from '../services/pool-api.service';
import { PoolStoreService } from '../services/pool-store.service';
import { UserService } from '../services/user.service';
import { Pool } from '../models/pool';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pools: Pool[] = [];

  constructor(
    private poolApiService: PoolApiService,
    private poolStoreService: PoolStoreService,
    public userService: UserService,
    public snackBar: MatSnackBar,
  ) {
    this.pools = this.userService.settings.pools;
  }

  ngOnInit() {
  }

  search(searchValue: string) {
    this.searchPaymentAddress(searchValue)
    .subscribe(results => {
      const pools = [];
      results.forEach((result, index) => {
        if (result != null && result['totalHashes'] !== undefined) {
          pools.push(this.pools[index]);
        }
      });
      if (pools.length > 0) {
        this.userService.settings.selectedAddress = searchValue;
        this.userService.settings.selectedPoolApiUrl = pools[0].apiUrl;
      }
      this.snackBar.open('Found ' + pools.length + ' pools with this address, using ' + pools[0].name + '.', 'Ok', {
        //duration: 1000,
      });
    });
  }

  searchPaymentAddress(paymentAddress: string): Observable<Pool[]> {
    const observableBatch = [];
    this.pools.forEach(pool => {
      observableBatch.push(
        this.poolApiService.getMinerStats(pool.apiUrl, paymentAddress)
      );
    });
    return forkJoin(observableBatch);
  }

}
