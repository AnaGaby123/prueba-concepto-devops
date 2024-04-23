/* Core Imports */
import {NgModule} from '@angular/core';

/* Common Imports */
import {CommonModule} from '@angular/common';

/* Routing Imports */
import {ExecuteCollectionCalendarRoutingModule} from '@appComponents/pendings/charges/execute-collection/execute-collection-calendar/execute-collection-calendar-routing.module';

/* Component Imports */
import {ExecuteCollectionCalendarComponent} from '@appComponents/pendings/charges/execute-collection/execute-collection-calendar/execute-collection-calendar.component';

/* Module Imports */
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {ChipModule} from '@appComponents/shared/chip/chip.module';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {WeekComponent} from './week/week.component';
import {MonthComponent} from './month/month.component';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';

@NgModule({
  declarations: [ExecuteCollectionCalendarComponent, WeekComponent, MonthComponent],
  imports: [
    CommonModule,
    ExecuteCollectionCalendarRoutingModule,
    TabsModule,
    ChipModule,
    TranslateModule,
    SearchModule,
    DropDownListModule,
    VirtualScrollerModule,
    DateFormatModule,
    LoadingModule,
    WithoutResultsModule,
    DatePickerModule,
  ],
  exports: [ExecuteCollectionCalendarComponent],
})
export class ExecuteCollectionCalendarModule {}
