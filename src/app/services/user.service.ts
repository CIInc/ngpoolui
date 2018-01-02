import { Injectable } from '@angular/core';
import { Pool } from '../models/pool';

const localStorageKey = 'settings';

@Injectable()
export class UserService {
  settings = {
    intervalTime: 10000,
    selectedPoolApiUrl: null,
    selectedAddress: '',
    networkStats: null,
    poolStats: null,
    minerStats: null
};
  constructor() {
    this.load();
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
