import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pool } from '../models/pool';

//const api = 'http://localhost:3000/api';
const api = '/api';

@Injectable()
export class PoolStoreService {

  constructor(private http: HttpClient) {
  }

  getPools() {
    return this.http.get<Array<Pool>>(`${api}/pools`);
  }

  deletePool(pool: Pool) {
    return this.http.delete(`${api}/pool/${pool.apiUrl}`);
  }

  addPool(pool: Pool) {
    return this.http.post<Pool>(`${api}/pool/`, pool);
  }

  updatePool(pool: Pool) {
    return this.http.put<Pool>(`${api}/pool/${pool.apiUrl}`, pool);
  }

  /*
  getStats(pool: Pool): Observable<any> {
    return this.http.get(pool.apiUrl + '/pool/stats');
  }
  */

}
