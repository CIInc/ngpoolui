import { Injectable } from '@angular/core';
import { Pool } from '../models/pool';

@Injectable()
export class UserService {
  selectedPool: Pool;
  networkStats: any;
  poolStats: any;

  constructor() { }

  changePool(pool: Pool) {
    this.selectedPool = pool;
  }
}
