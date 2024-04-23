import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FollowPurchasePromiseDetailsComponent} from './follow-purchase-promise-details.component';
import {FollowPurchasePromiseDetailsRoutingModule} from '@appComponents/pendings/follow-purchase-promise/follow-purchase-promise-details/follow-purchase-promise-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DropListFiltersModule} from '@appComponents/shared/drop-list-filters/drop-list-filters.module';
import {PopUpAlertModule} from '@appComponents/shared/pop-up-alert/pop-up-alert.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {HistoryDialogModule} from '@appComponents/pendings/follow-purchase-promise/follow-purchase-promise-details/history-dialog/history-dialog.module';

@NgModule({
  declarations: [FollowPurchasePromiseDetailsComponent],
  imports: [
    CommonModule,
    FollowPurchasePromiseDetailsRoutingModule,
    TranslateModule,
    ProgressBarModule,
    DateFormatModule,
    SearchModule,
    CheckBoxModule,
    DropDownListModule,
    GenericInputModule,
    DatePickerModule,
    VirtualScrollerModule,
    PopUpGenericModule,
    LoadingModule,
    WithoutResultsModule,
    DropListFiltersModule,
    PopUpAlertModule,
    InternalSalesItemModule,
    HeaderInternalSalesItemModule,
    HistoryDialogModule,
  ],
  exports: [FollowPurchasePromiseDetailsComponent],
})
export class FollowPurchasePromiseDetailsModule {}
