import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';

import { PoolApiService } from './services/pool-api.service';
import { PoolStoreService } from './services/pool-store.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  // Side menu options
  modeIndex = 2;
  get mode() { return ['side', 'over', 'push'][this.modeIndex]; }

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private poolApiService: PoolApiService,
    private poolStoreService: PoolStoreService,
    public userService: UserService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.poolStoreService.getPools().subscribe(pools => {
      this.userService.setPools(pools);
      if (this.userService.settings.selectedPoolApiUrl == null) {
        this.userService.settings.selectedPoolApiUrl = pools[0].apiUrl;
      }
    }, error => {
      if (error.status === 500) {
      }
      console.warn(error.message);
    });

    const interval1 = timer(1, this.userService.minerIntervalTime);
    const subcription1 = interval1.subscribe(val => {
      console.log('timer1');
      this.getMinerStats();
    });

    const interval2 = timer(1, this.userService.poolIntervalTime);
    const subcription2 = interval2.subscribe(val => {
      console.log('timer2');
      this.getPoolStats();
    });
  }

  getPoolStats() {
    if (this.userService.settings.selectedPoolApiUrl == null) {
      return;
    }
    this.poolApiService.getNetworkStats(this.userService.settings.selectedPoolApiUrl).subscribe(results => {
      this.userService.settings.networkStats = results;
      this.userService.save();
    });
    this.poolApiService.getPoolStats(this.userService.settings.selectedPoolApiUrl).subscribe(results => {
      this.userService.settings.poolStats = results.pool_statistics;
      this.userService.save();
    });
  }
  getMinerStats() {
    if (this.userService.settings.selectedPoolApiUrl == null
      || this.userService.settings.selectedAddress == null
      || this.userService.settings.selectedAddress.length === 0) {
      return;
    }
    this.poolApiService.getMinerStats(this.userService.settings.selectedPoolApiUrl, this.userService.settings.selectedAddress)
    .subscribe(results => {
      this.userService.settings.minerStats = results;
      this.userService.save();
    });
    this.poolApiService.getMinerWorkerStats(this.userService.settings.selectedPoolApiUrl, this.userService.settings.selectedAddress)
      .subscribe(results => {
        const keys = Object.keys(results);
        const workers = [];
        keys.forEach(key => {
          if (results[key].identifer !== 'global') {
            workers.push(results[key]);
          }
        });
        this.userService.settings.minerWorkerStats = workers;
      this.userService.save();
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    //this.subcription1.dispose();
  }

}
