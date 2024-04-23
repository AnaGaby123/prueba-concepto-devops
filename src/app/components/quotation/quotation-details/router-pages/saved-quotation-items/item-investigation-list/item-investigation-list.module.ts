import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {ItemListProductInvestigationComponentModule} from '@appComponents/quotation/quotation-details/router-pages/shared/item-list-product-investigation-component/item-list-product-investigation-component.module';
import {ItemInvestigationListComponent} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/item-investigation-list/item-investigation-list.component';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {SeeProductInInvestigationDialogModule} from '@appComponents/quotation/quotation-details/router-pages/saved-quotation-items/item-investigation-list/see-product-in-investigation-dialog/see-product-in-investigation-dialog.module';

@NgModule({
  declarations: [ItemInvestigationListComponent],
  imports: [
    CommonModule,
    TranslateModule,
    VirtualScrollerModule,
    GenericInputFileModule,
    DateFormatModule,
    ItemListProductInvestigationComponentModule,
    InternalSalesItemModule,
    HeaderInternalSalesItemModule,
    SeeProductInInvestigationDialogModule,
  ],
  exports: [ItemInvestigationListComponent],
})
export class ItemInvestigationListModule {}
