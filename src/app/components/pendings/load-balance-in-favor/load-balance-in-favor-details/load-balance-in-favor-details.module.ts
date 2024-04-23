/* Core Imports */
import {NgModule} from '@angular/core';

/* Components Imports */
import {LoadBalanceInFavorDetailsComponent} from '@appComponents/pendings/load-balance-in-favor/load-balance-in-favor-details/load-balance-in-favor-details.component';

/* Module Imports */
import {CommonModule} from '@angular/common';
import {LoadBalanceInFavorDetailsRoutingModule} from '@appComponents/pendings/load-balance-in-favor/load-balance-in-favor-details/load-balance-in-favor-details-routing.module';

@NgModule({
  imports: [CommonModule, LoadBalanceInFavorDetailsRoutingModule],
  exports: [LoadBalanceInFavorDetailsComponent],
  declarations: [LoadBalanceInFavorDetailsComponent],
})
export class LoadBalanceInFavorDetailsModule {}
