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
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PoolApiService } from './services/pool-api.service';
import { PoolStoreService } from './services/pool-store.service';
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { PoolsComponent } from './pools/pools.component';
import { BlocksComponent } from './pool/blocks/blocks.component';
import { PaymentsComponent } from './pool/payments/payments.component';
import { DifficultyToHashRatePipe } from './pipes/difficultyToHashRate.pipe';
import { AbbreviatedNumberPipe } from './pipes/abbreviatedNumber.pipe';
import { PoolsAddDialogComponent } from './pools/pools-add-dialog/pools-add-dialog.component';
import { SettingsComponent } from './settings/settings.component';
import { PoolComponent } from './pool/pool.component';

@NgModule({
  declarations: [
    AppComponent,
    PoolsComponent,
    HomeComponent,
    BlocksComponent,
    PaymentsComponent,
    DifficultyToHashRatePipe,
    AbbreviatedNumberPipe,
    PoolsAddDialogComponent,
    SettingsComponent,
    PoolComponent
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
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [PoolApiService, MediaMatcher, PoolStoreService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
