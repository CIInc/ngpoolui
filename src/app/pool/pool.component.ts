import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PoolApiService } from '../services/pool-api.service';
import { PoolStoreService } from '../services/pool-store.service';
import { UserService } from '../services/user.service';
import { Pool } from '../models/pool';
import { Pools } from '../models/pools';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit {

  pool: Pool;

  constructor(
    private poolApiService: PoolApiService,
    private poolStoreService: PoolStoreService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.getPool();
  }

  getPool(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.poolStoreService.getPools().subscribe(pools => {
      this.pool = pools.find(p => p['_id'] === id);
    });
  }
}
