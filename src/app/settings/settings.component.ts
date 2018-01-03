import { Component, OnInit } from '@angular/core';

import { PoolApiService } from '../services/pool-api.service';
import { PoolStoreService } from '../services/pool-store.service';
import { UserService } from '../services/user.service';
import { Pool } from '../models/pool';
import { Pools } from '../models/pools';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  pools: Pool[] = []; // Pools.Default();

  constructor(
    private poolApiService: PoolApiService,
    private poolStoreService: PoolStoreService,
    private userService: UserService,
  ) {
    this.pools = this.userService.settings.pools;
  }

  ngOnInit() {
  }

  save() {
    this.userService.save();
  }
}
