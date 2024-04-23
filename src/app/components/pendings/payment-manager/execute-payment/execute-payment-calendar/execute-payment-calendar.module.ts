/* Core Imports */
import {NgModule} from '@angular/core';

/* Common Imports */
import {CommonModule} from '@angular/common';

/* Routing Imports */
import {ExecutePaymentCalendarRoutingModule} from '@appComponents/pendings/payment-manager/execute-payment/execute-payment-calendar/execute-payment-calendar-routing.module';

/* Component Imports */
import {ExecutePaymentCalendarComponent} from '@appComponents/pendings/payment-manager/execute-payment/execute-payment-calendar/execute-payment-calendar.component';
import {WeekComponent} from '@appComponents/pendings/payment-manager/execute-payment/execute-payment-calendar/week/week.component';
import {MonthComponent} from '@appComponents/pendings/payment-manager/execute-payment/execute-payment-calendar/month/month.component';

/* Module Imports */
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {ChipModule} from '@appComponents/shared/chip/chip.module';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [ExecutePaymentCalendarComponent, WeekComponent, MonthComponent],
  imports: [
    CommonModule,
    DragDropModule,
    ExecutePaymentCalendarRoutingModule,
    TabsModule,
    ChipModule,
    TranslateModule,
    SearchModule,
    DropDownListModule,
    VirtualScrollerModule,
    DatePickerModule,
    DateFormatModule,
  ],
  exports: [ExecutePaymentCalendarComponent],
})
export class ExecutePaymentCalendarModule {}
