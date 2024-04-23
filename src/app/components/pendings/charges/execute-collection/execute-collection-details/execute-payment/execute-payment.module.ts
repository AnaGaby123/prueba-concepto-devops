/* Core Imports */
import {NgModule} from '@angular/core';

/* Common Imports */
import {CommonModule} from '@angular/common';

/* Components Imports */
import {ExecutePaymentComponent} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/execute-payment/execute-payment.component';

/* Module Imports */
import {ExecutePaymentRoutingModule} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/execute-payment/execute-payment-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {ChipFileModule} from '@appComponents/shared/chip-file/chip-file.module';
import {PopUpSendEmailModule} from '@appComponents/shared/pop-up-send-email/pop-up-send-email.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {FormsModule} from '@angular/forms';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';

@NgModule({
  declarations: [ExecutePaymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ExecutePaymentRoutingModule,
    TranslateModule,
    GenericInputModule,
    DropDownListModule,
    DatePickerModule,
    GenericInputFileModule,
    VirtualScrollerModule,
    DateFormatModule,
    ChipFileModule,
    PopUpSendEmailModule,
    WithoutResultsModule,
    CheckBoxModule,
    RadioButtonModule,
    CustomPositionPopUpModule,
    DoughnutChartModule,
    HamburgerMenuModule,
  ],
  exports: [ExecutePaymentComponent],
})
export class ExecutePaymentModule {}
