import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MediaMatcher } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTabsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatCardModule,
  MatListModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule
} from '@angular/material';

import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PoolApiService } from './services/pool-api.service';
import { PoolStoreService } from './services/pool-store.service';
import { UserService } from './services/user.service';

import { DifficultyToHashRatePipe } from './pipes/difficultyToHashRate.pipe';
import { AbbreviatedNumberPipe } from './pipes/abbreviatedNumber.pipe';
import { ToXMRPipe } from './pipes/toXMR.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { EllipsisPipe } from './pipes/ellipsis.pipe';

import { GoogleChartDirective } from './directives/google-chart.directive';

import { HomeComponent } from './home/home.component';
import { PoolsComponent } from './pools/pools.component';
import { BlocksComponent } from './pool/blocks/blocks.component';
import { PaymentsComponent } from './pool/payments/payments.component';
import { PoolsAddDialogComponent } from './pools/pools-add-dialog/pools-add-dialog.component';
import { SettingsComponent } from './settings/settings.component';
import { PoolComponent } from './pool/pool.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    DifficultyToHashRatePipe,
    AbbreviatedNumberPipe,
    ToXMRPipe,
    KeysPipe,
    EllipsisPipe,
    GoogleChartDirective,
    PoolsComponent,
    HomeComponent,
    BlocksComponent,
    PaymentsComponent,
    PoolsAddDialogComponent,
    SettingsComponent,
    PoolComponent,
    AboutComponent
  ],
  entryComponents: [
    PoolsAddDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MomentModule
  ],
  providers: [PoolApiService, MediaMatcher, PoolStoreService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
