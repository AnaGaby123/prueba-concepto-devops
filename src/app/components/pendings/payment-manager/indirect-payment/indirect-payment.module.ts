import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndirectPaymentComponent} from './indirect-payment.component';
import {IndirectPaymentRoutingModule} from '@appComponents/pendings/payment-manager/indirect-payment/indirect-payment-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [IndirectPaymentComponent],
  imports: [
    CommonModule,
    IndirectPaymentRoutingModule,
    HeaderBarModule,
    TranslateModule,
    DatePickerModule,
    GenericInputModule,
    CheckBoxModule,
    DropDownListModule,
    GenericInputFileModule,
    RadioButtonModule,
    WithoutResultsModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.paymentManager),
    ),
  ],
  exports: [IndirectPaymentComponent],
})
export class IndirectPaymentModule {}
