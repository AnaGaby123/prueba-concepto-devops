import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuotationNewComponent} from './quotation-new.component';
import {TranslateModule} from '@ngx-translate/core';
import {QuotationNewRoutingModule} from '@appComponents/pendings/close-offer/close-offer-details/general-data/quotation-new/quotation-new-routing.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DropListFiltersModule} from '@appComponents/shared/drop-list-filters/drop-list-filters.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {StrategyPopUpModule} from '@appComponents/shared/strategy-pop-up/strategy-pop-up.module';
import {SendEmailDialogModule} from '@appComponents/shared/send-email-dialog/send-email-dialog.module';

@NgModule({
  declarations: [QuotationNewComponent],
  imports: [
    CommonModule,
    QuotationNewRoutingModule,
    TranslateModule,
    SearchModule,
    VirtualScrollerModule,
    CheckBoxModule,
    CustomPositionPopUpModule,
    LoadingModule,
    WithoutResultsModule,
    DateFormatModule,
    DropListFiltersModule,
    DropDownListModule,
    GenericInputModule,
    InternalSalesItemModule,
    HeaderInternalSalesItemModule,
    StrategyPopUpModule,
    SendEmailDialogModule,
  ],
  exports: [QuotationNewComponent],
})
export class QuotationNewModule {}
