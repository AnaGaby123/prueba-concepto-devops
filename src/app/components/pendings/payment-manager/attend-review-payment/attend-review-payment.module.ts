import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttendReviewPaymentComponent} from './attend-review-payment.component';
import {AttendReviewPaymentRoutingModule} from '@appComponents/pendings/payment-manager/attend-review-payment/attend-review-payment-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [AttendReviewPaymentComponent],
  imports: [
    CommonModule,
    AttendReviewPaymentRoutingModule,
    HeaderBarModule,
    TranslateModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.paymentManager),
    ),
  ],
  exports: [AttendReviewPaymentComponent],
})
export class AttendReviewPaymentModule {}
