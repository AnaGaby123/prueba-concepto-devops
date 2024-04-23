import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageAdvancePaymentComponent} from '@appComponents/pendings/charges/manage-advance-payment/manage-advance-payment.component';
import {ManageAdvancePaymentRoutingModule} from '@appComponents/pendings/charges/manage-advance-payment/manage-advance-payment-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [ManageAdvancePaymentComponent],
  imports: [
    CommonModule,
    ManageAdvancePaymentRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.charges),
    ),
  ],
  exports: [ManageAdvancePaymentComponent],
})
export class ManageAdvancePaymentModule {}
