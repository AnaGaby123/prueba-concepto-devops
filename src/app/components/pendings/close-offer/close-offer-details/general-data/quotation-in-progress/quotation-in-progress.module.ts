import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuotationInProgressComponent} from './quotation-in-progress.component';
import {QuotationInProgressRoutingModule} from '@appComponents/pendings/close-offer/close-offer-details/general-data/quotation-in-progress/quotation-in-progress-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {StrategyPopUpModule} from '@appComponents/shared/strategy-pop-up/strategy-pop-up.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';

@NgModule({
  declarations: [QuotationInProgressComponent],
  imports: [
    CommonModule,
    QuotationInProgressRoutingModule,
    TabsModule,
    SearchModule,
    TranslateModule,
    VirtualScrollerModule,
    StrategyPopUpModule,
    CheckBoxModule,
    CustomPositionPopUpModule,
    DateFormatModule,
    LoadingModule,
    WithoutResultsModule,
    InternalSalesItemModule,
    HeaderInternalSalesItemModule,
  ],
  exports: [QuotationInProgressComponent],
})
export class QuotationInProgressModule {}
