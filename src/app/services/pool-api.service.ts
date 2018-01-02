import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { Pool } from '../models/pool';
import { Pools } from '../models/pools';

@Injectable()
export class PoolApiService {

  constructor(private http: HttpClient) { }

  getNetworkStats(apiUrl: string): Observable<any> {
    return this.http.get(apiUrl + '/network/stats');
  }

  getPoolStats(apiUrl: string): Observable<any> {
    return this.http.get(apiUrl + '/pool/stats');
  }

  getMinerStats(apiUrl: string, address: string): Observable<any> {
    return this.http.get(apiUrl + '/miner/' + address + '/stats');
  }

  getBlocks(apiUrl: string): Observable<any> {
    return this.http.get(apiUrl + '/pool/blocks');
  }

  getPayments(apiUrl: string): Observable<any> {
    return this.http.get(apiUrl + '/pool/payments');
  }

  updateStat(pool: Pool) {
    this.getPoolStats(pool.apiUrl).subscribe(result => {
      pool.hashRate = result.pool_statistics.hashRate;
      pool.miners = result.pool_statistics.miners;
      pool.totalHashes = result.pool_statistics.totalHashes;
      pool.lastBlockFoundTime = new Date(result.pool_statistics.lastBlockFoundTime * 1000);
      pool.lastBlockFound = result.pool_statistics.lastBlockFound;
      pool.totalBlocksFound = result.pool_statistics.totalBlocksFound;
      pool.totalMinersPaid = result.pool_statistics.totalMinersPaid;
      pool.totalPayments = result.pool_statistics.totalPayments;
      pool.roundHashes = result.pool_statistics.roundHashes;
      pool.poolList = result.pool_list;
    });
  }
}
