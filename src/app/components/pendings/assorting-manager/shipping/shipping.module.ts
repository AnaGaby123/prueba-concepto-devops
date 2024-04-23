import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShippingComponent} from './shipping.component';
import {ShippingRoutingModule} from '@appComponents/pendings/assorting-manager/shipping/shipping-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [ShippingComponent],
  imports: [
    CommonModule,
    ShippingRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.assortingManager),
    ),
  ],
  exports: [ShippingComponent],
})
export class ShippingModule {}
