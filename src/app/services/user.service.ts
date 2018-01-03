import { Injectable } from '@angular/core';
import { Pool } from '../models/pool';

const localStorageKey = 'settings';

@Injectable()
export class UserService {
  settings = {
    isDarkTheme: false,
    intervalTime: 10000,
    selectedPoolApiUrl: null,
    selectedAddress: '',
    networkStats: null,
    poolStats: null,
    minerStats: null,
    minerWorkerStats: null,
    pools: []
  };

  valueChanged: (oldVal, newVal) => void;

  constructor() {
    this.valueChanged = (() => {});
    this.load();
  }

  setPools(pools: Pool[]) {
    this.valueChanged(this.settings.pools, pools);
    this.settings.pools = pools;
    this.save();
  }

  load() {
    const cache: string = localStorage.getItem(localStorageKey);
    if (cache) {
      this.settings = JSON.parse(cache);
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
}
