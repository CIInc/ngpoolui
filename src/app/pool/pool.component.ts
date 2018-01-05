import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PoolApiService } from '../services/pool-api.service';
import { PoolStoreService } from '../services/pool-store.service';
import { UserService } from '../services/user.service';
import { Pool } from '../models/pool';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit {

  pool: Pool;
  chartDataHashRate: any;
  chartDataMiners: any;

  constructor(
    private poolApiService: PoolApiService,
    private poolStoreService: PoolStoreService,
    public userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.getPool();
  }

  ngOnInit() {
  }

  getPool(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pool = this.userService.settings.pools.find(p => p['_id'] === id);
    this.getStats();
  }
  getStats() {
    if (this.pool == null) {
      return;
    }
    this.poolApiService.updatePoolStat(this.pool);

    if (this.userService.settings.selectedAddress !== '') {
      this.poolApiService.getMinerWorkerStats(this.pool.apiUrl, this.userService.settings.selectedAddress).subscribe(results => {
        this.userService.settings.minerWorkerStats = results;
        this.userService.save();
      });
    }

    this.poolApiService.getPoolChartHashRate(this.pool.apiUrl).subscribe(result => {
      this.chartDataHashRate = result;
      /*
      // Create the data table.
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      data.addRows([
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
      ]);

      // Set chart options
      var options = {'title':'How Much Pizza I Ate Last Night',
                      'width':400,
                      'height':300};

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
      chart.draw(data, options);
      */
    });
    this.chartDataMiners = this.poolApiService.getPoolChartMiners(this.pool.apiUrl);
  }
}
