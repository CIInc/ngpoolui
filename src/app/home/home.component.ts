import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { resetFakeAsyncZone } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { interval } from 'rxjs/observable/interval';

import { PoolApiService } from '../services/pool-api.service';
import { PoolStoreService } from '../services/pool-store.service';
import { UserService } from '../services/user.service';
import { Pool } from '../models/pool';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pools: Pool[] = [];

  myInterval;
  subcription1;

  area_ChartData = [
    /*
    ['Year', 'Sales', 'Expenses'],
    ['2013', 1000, 400],
    ['2014', 1170, 460],
    ['2015', 660, 1120],
    ['2016', 1030, 540]
    */
  ];

  area_ChartOptions = {
      //title: 'Mining Performance',
      //width: 400,
      //hAxis: {title: 'Date', titleTextStyle: {color: '#333'}},
      vAxis: {minValue: 0}
  };

  constructor(
    private poolApiService: PoolApiService,
    private poolStoreService: PoolStoreService,
    public userService: UserService,
    public snackBar: MatSnackBar,
  ) {

    this.getChartStats();

    this.myInterval = interval(this.userService.settings.chartIntervalTime);
    this.subcription1 = this.myInterval.subscribe(val => {
      this.getChartStats();
    });
  }

  ngOnInit() {
  }

  getChartStats() {
    this.pools = this.userService.settings.pools;
    this.poolApiService.getMinerWorkerChartHashRate(this.userService.settings.selectedPoolApiUrl, this.userService.settings.selectedAddress).subscribe(results => {
      this.userService.settings.minerWorkerChartHashRate = results;
      this.userService.save();
      this.drawChart();
    });
  }

  drawChart() {
    if (this.userService.settings.minerWorkerChartHashRate) {
      this.area_ChartData = [];
      const keys = Object.keys(this.userService.settings.minerWorkerChartHashRate);
      const legendArray = ['Date'];
      const datesDict = {};
      keys.forEach(key => {
        //alert(key);
        legendArray.push(key);
        //alert(JSON.stringify(this.userService.settings.minerWorkerChartHashRate[key]));
        this.userService.settings.minerWorkerChartHashRate[key].forEach(element => {
          const dt = new Date(element.ts);
          //const dt = element.ts.toString();
          if (datesDict[dt.toString()] == null) {
            datesDict[dt.toString()] = [dt];
            //datesDict[dt.toString()] = new Array(legendArray.length).map(function () {return null;});
            //datesDict[dt.toString()].push(dt);
          }
          datesDict[dt.toString()].push(element.hs);
        });
      });
      if (legendArray.length === 2 && legendArray[1] === 'global') {
        return;
      }
      this.area_ChartData.push(legendArray);
      Object.keys(datesDict).forEach(d => {
        if (datesDict[d].length === legendArray.length) {
          this.area_ChartData.push(datesDict[d]);
        }
      });
      /*
      alert(JSON.stringify(this.area_ChartData[0]));
      alert(JSON.stringify(this.area_ChartData[1]));
      alert(JSON.stringify(this.area_ChartData[this.area_ChartData.length -2]));
      alert(JSON.stringify(this.area_ChartData[this.area_ChartData.length -1]));
      */
      /*
      this.area_ChartData = [
        ['Year', 'Sales', 'Expenses'],
        ['2013', 1000, 400],
        ['2014', 1170, 460],
        ['2015', 660, 1120],
        ['2016', 1030, 540]
      ];
      */
    }
  }

  search(searchValue: string) {
    this.searchPaymentAddress(searchValue)
    .subscribe(results => {
      const pools = [];
      results.forEach((result, index) => {
        if (result != null && result['totalHashes'] !== undefined) {
          pools.push(this.pools[index]);
        }
      });
      if (pools.length > 0) {
        if (!this.userService.settings.addresses.includes(searchValue)) {
          this.userService.settings.addresses.push(searchValue);
        }
        this.userService.settings.selectedAddress = searchValue;
        this.userService.settings.selectedPoolApiUrl = pools[0].apiUrl;
      }
      this.snackBar.open('Found ' + pools.length + ' pools with this address, using ' + pools[0].name + '.', 'Ok', {
        //duration: 1000,
      });
    });
  }

  searchPaymentAddress(paymentAddress: string): Observable<Pool[]> {
    const observableBatch = [];
    this.pools.forEach(pool => {
      observableBatch.push(
        this.poolApiService.getMinerStats(pool.apiUrl, paymentAddress)
      );
    });
    return forkJoin(observableBatch);
  }

  ngOnDestroy(): void {
    //this.subcription1.dispose();
  }
}
