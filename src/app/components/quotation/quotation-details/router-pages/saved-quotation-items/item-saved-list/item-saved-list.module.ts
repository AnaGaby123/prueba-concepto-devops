import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemSavedListComponent} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/item-saved-list/item-saved-list.component';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {PopItemsProductsModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/pop-items-products/pop-items-products.module';
import {AddRealizationDatesPopUpModule} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-items/item-training/add-realization-dates-pop-up/add-realization-dates-pop-up.module';
import {FreightDetailsModule} from '@appComponents/quotation/quotation-details/router-pages/shared/freight-details/freight-details.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {ItemSavedDetailsDialogModule} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/item-saved-list/item-saved-details-dialog/item-saved-details-dialog.module';

@NgModule({
  declarations: [ItemSavedListComponent],
  imports: [
    CommonModule,
    VirtualScrollerModule,
    DateFormatModule,
    TranslateModule,
    FormsModule,
    PopUpGenericModule,
    PopItemsProductsModule,
    AddRealizationDatesPopUpModule,
    FreightDetailsModule,
    InternalSalesItemModule,
    HeaderInternalSalesItemModule,
    ItemSavedDetailsDialogModule,
  ],
  exports: [ItemSavedListComponent],
})
export class ItemSavedListModule {}
