import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { Pool } from '../models/pool';
import { Pools } from '../models/pools';

@Injectable()
export class PoolApiService {

  pools = Pools.Default();

  constructor(private http: HttpClient) { }

  getNetworkStats(pool: Pool): Observable<any> {
    return this.http.get(pool.apiUrl + '/network/stats');
  }

  getStats(pool: Pool): Observable<any> {
    return this.http.get(pool.apiUrl + '/pool/stats');
  }

  getBlocks(pool: Pool): Observable<any> {
    return this.http.get(pool.apiUrl + '/pool/blocks');
  }

  getPayments(pool: Pool): Observable<any> {
    return this.http.get(pool.apiUrl + '/pool/payments');
  }

  // Helper methods to iterate through all the pools.

  getPoolsStats(): Observable<Pool[]> {
    const observableBatch = [];
    this.pools.forEach(pool => {
      observableBatch.push(
        this.getStats(pool)
      );
    });
    return forkJoin(observableBatch);
  }

  searchPaymentAddress(paymentAddress: string): Observable<Pool[]> {
    const observableBatch = [];
    this.pools.forEach(pool => {
      observableBatch.push(
        this.http.get(pool.apiUrl + '/miner/' + paymentAddress + '/stats')
      );
    });
    return forkJoin(observableBatch);
  }
}
