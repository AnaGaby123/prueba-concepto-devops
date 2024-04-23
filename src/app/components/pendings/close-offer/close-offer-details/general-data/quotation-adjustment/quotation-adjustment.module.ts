import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuotationAdjustmentComponent} from './quotation-adjustment.component';
import {QuotationAdjustmentRoutingModule} from '@appComponents/pendings/close-offer/close-offer-details/general-data/quotation-adjustment/quotation-adjustment-routing.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {ItemAdjustedModule} from '@appComponents/pendings/close-offer/close-offer-details/general-data/quotation-adjustment/item-adjusted/item-adjusted.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {SendEmailDialogModule} from '@appComponents/shared/send-email-dialog/send-email-dialog.module';

@NgModule({
  declarations: [QuotationAdjustmentComponent],
  imports: [
    CommonModule,
    QuotationAdjustmentRoutingModule,
    SearchModule,
    TranslateModule,
    VirtualScrollerModule,
    CheckBoxModule,
    TabsModule,
    CustomPositionPopUpModule,
    HamburgerMenuModule,
    PopUpGenericModule,
    LoadingModule,
    WithoutResultsModule,
    DateFormatModule,
    ItemAdjustedModule,
    HeaderInternalSalesItemModule,
    InternalSalesItemModule,
    GenericInputModule,
    DropDownListModule,
    SendEmailDialogModule,
  ],
  exports: [QuotationAdjustmentComponent],
})
export class QuotationAdjustmentModule {}
