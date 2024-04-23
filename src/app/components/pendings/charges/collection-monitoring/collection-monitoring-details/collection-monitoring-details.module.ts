import {NgModule} from '@angular/core';
import {CollectionMonitoringDetailsComponent} from '@appComponents/pendings/charges/collection-monitoring/collection-monitoring-details/collection-monitoring-details.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CollectionMonitoringDetailsRoutingModule} from '@appComponents/pendings/charges/collection-monitoring/collection-monitoring-details/collection-monitoring-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DropDownSearchModule} from '@appComponents/shared/drop-down-search/drop-down-search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {AddCommentComponent} from './pop-ups/add-comment/add-comment.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {AddCommentsComponent} from './pop-ups/add-comments/add-comments.component';
import {DateFormatModule} from '@appPipes/date-format.module';
import {PercentageBarModule} from '@appComponents/shared/percentage-bar/percentage-bar.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CollectionMonitoringDetailsRoutingModule,
    TranslateModule,
    TabsModule,
    ProgressBarModule,
    DropDownListModule,
    DateRangeModule,
    SearchModule,
    DropDownSearchModule,
    VirtualScrollerModule,
    CheckBoxModule,
    PopUpGenericModule,
    GenericTextAreaModule,
    DateFormatModule,
    PercentageBarModule,
    LoadingModule,
    WithoutResultsModule,
    DatePickerModule,
  ],
  exports: [CollectionMonitoringDetailsComponent],
  declarations: [CollectionMonitoringDetailsComponent, AddCommentComponent, AddCommentsComponent],
})
export class CollectionMonitoringDetailsModule {}
