import {NgModule} from '@angular/core';
import {CollectionMonitoringListComponent} from '@appComponents/pendings/charges/collection-monitoring/collection-monitoring-list/collection-monitoring-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollectionMonitoringListRoutingModule} from '@appComponents/pendings/charges/collection-monitoring/collection-monitoring-list/collection-monitoring-list-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {ChipModule} from '@appComponents/shared/chip/chip.module';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CollectionMonitoringListRoutingModule,
    TabsModule,
    SearchModule,
    ChipModule,
    TranslateModule,
    DateFormatModule,
    WithoutResultsModule,
    VirtualScrollerModule,
    LoadingModule,
    DatePickerModule,
    DropDownListModule,
  ],
  exports: [CollectionMonitoringListComponent],
  declarations: [CollectionMonitoringListComponent],
})
export class CollectionMonitoringListModule {}
