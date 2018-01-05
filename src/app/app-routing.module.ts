import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BlocksComponent } from './pool/blocks/blocks.component';
import { PaymentsComponent } from './pool/payments/payments.component';
import { PoolsComponent } from './pools/pools.component';
import { PoolComponent } from './pool/pool.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  //{ path: 'blocks', component: BlocksComponent },
  //{ path: 'payments', component: PaymentsComponent },
  { path: 'pools', component: PoolsComponent },
  { path: 'pools/:id', component: PoolComponent },
  { path: 'pools/:id/blocks', component: BlocksComponent },
  { path: 'pools/:id/payments', component: PaymentsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'help', component: AboutComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
