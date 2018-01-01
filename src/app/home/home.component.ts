import { Component, OnInit } from '@angular/core';
import { PoolApiService } from '../services/pool-api.service';
import { UserService } from '../services/user.service';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private poolApiService: PoolApiService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
  }

}
