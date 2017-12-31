import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import {MediaMatcher} from '@angular/cdk/layout';

import { AppComponent } from './app.component';

import {
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatSelectModule,
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';

import { PoolsComponent } from './pools/pools.component';
import { PoolApiService } from './pool-api.service';
import { PoolStoreService } from './pool-store.service';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlocksComponent } from './blocks/blocks.component';
import { PaymentsComponent } from './payments/payments.component';

@NgModule({
  declarations: [
    AppComponent,
    PoolsComponent,
    HomeComponent,
    DashboardComponent,
    BlocksComponent,
    PaymentsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [PoolApiService, MediaMatcher, PoolStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
