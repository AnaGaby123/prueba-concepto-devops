import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExecutePaymentComponent} from './execute-payment.component';
import {ExecutePaymentRoutingModule} from '@appComponents/pendings/payment-manager/execute-payment/execute-payment-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [ExecutePaymentComponent],
  imports: [
    CommonModule,
    ExecutePaymentRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.paymentManager),
    ),
  ],
  exports: [ExecutePaymentComponent],
})
export class ExecutePaymentModule {}
