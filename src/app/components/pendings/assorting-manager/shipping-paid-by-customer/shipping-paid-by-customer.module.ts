import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShippingPaidByCustomerComponent} from './shipping-paid-by-customer.component';
import {ShippingPaidByCustomerRoutingModule} from '@appComponents/pendings/assorting-manager/shipping-paid-by-customer/shipping-paid-by-customer-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [ShippingPaidByCustomerComponent],
  imports: [
    CommonModule,
    ShippingPaidByCustomerRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.assortingManager),
    ),
  ],
  exports: [ShippingPaidByCustomerComponent],
})
export class ShippingPaidByCustomerModule {}
