import { Injectable } from '@angular/core';
import { Pool } from '../models/pool';

const localStorageKey = 'settings';

@Injectable()
export class UserService {
  settings = {
    isDarkTheme: false,
    selectedPoolApiUrl: null,
    selectedAddress: '',
    addresses: [],
    networkStats: null,
    poolIntervalTime: 30000,
    poolStats: null,
    minerIntervalTime: 10000,
    chartIntervalTime: 30000,
    minerStats: null,
    minerWorkerStats: null,
    minerWorkerChartHashRate: null,
    pools: []
  };

  //valueChanged: (oldVal, newVal) => void;

  constructor() {
    this.load();

    //// Usage:  
    ////this.userService.valueChanged = (oldvalue, newvalue) => {...};
    //this.valueChanged = (() => {});
  }

  load() {
    const cache: string = localStorage.getItem(localStorageKey);
    if (cache) {
      this.settings = JSON.parse(cache);
    }
    // Remove once the schema changes are detected
    if (this.settings.addresses == null) {
      this.settings.addresses = [];
    }
  }

  save() {
    /*
    if (this.settings.selectedPoolApiUrl !== this.settings.selectedPool.apiUrl) {
      this.settings.selectedPool = this.pools.find(p => p.apiUrl === this.settings.selectedPoolApiUrl);
      alert(this.settings.selectedPool.apiUrl);
      alert(this.settings.selectedPoolApiUrl);
    }
    */
    localStorage.setItem(localStorageKey, JSON.stringify(this.settings));
  }

  setPools(pools: Pool[]) {
    //this.valueChanged(this.settings.pools, pools);
    //pools.forEach((pool, index) => {
    //  pool.id = index;
    //});
    this.settings.pools = pools;
    this.save();
  }

  getTotalMiners() {
    return this.settings.pools.map(pool => pool.miners).reduce((accumulator, currentValue) => accumulator + currentValue);
  }
}
