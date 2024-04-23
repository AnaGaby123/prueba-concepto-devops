import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentOrderComponent} from './payment-order.component';
import {PaymentOrderRoutingModule} from '@appComponents/pendings/payment-manager/payment-order/payment-order-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [PaymentOrderComponent],
  imports: [
    CommonModule,
    PaymentOrderRoutingModule,
    HeaderBarModule,
    TranslateModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.paymentManager),
    ),
  ],
  exports: [PaymentOrderComponent],
})
export class PaymentOrderModule {}
