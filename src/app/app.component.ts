import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';

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
  
  subcription1;

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

    this.getMinerStats();
    const interval1 = interval(this.userService.settings.minerIntervalTime);
    this.subcription1 = interval1.subscribe(val => {
      this.getMinerStats();
    });

    this.getPoolStats();
    const interval2 = interval(this.userService.settings.poolIntervalTime);
    this.subcription1 = interval2.subscribe(val => {
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
    if (this.userService.settings.selectedPoolApiUrl == null || this.userService.settings.selectedAddress == null) {
      return;
    }
    this.poolApiService.getMinerStats(this.userService.settings.selectedPoolApiUrl, this.userService.settings.selectedAddress)
    .subscribe(results => {
      this.userService.settings.minerStats = results;
      this.userService.save();
    });
    this.poolApiService.getMinerWorkerStats(this.userService.settings.selectedPoolApiUrl, this.userService.settings.selectedAddress)
      .subscribe(results => {
      this.userService.settings.minerWorkerStats = results;
      this.userService.save();
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    //this.subcription1.dispose();
  }

}
