import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadBalanceInFavorComponent} from './load-balance-in-favor.component';
import {LoadBalanceInFavorRoutingModule} from '@appComponents/pendings/load-balance-in-favor/load-balance-in-favor-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [LoadBalanceInFavorComponent],
  imports: [
    CommonModule,
    LoadBalanceInFavorRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.loadBalanceInFavor),
    ),
  ],
  exports: [LoadBalanceInFavorComponent],
})
export class LoadBalanceInFavorModule {}
