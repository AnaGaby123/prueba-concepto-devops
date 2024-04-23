import {NgModule} from '@angular/core';
import {AddPurchaseOrderItemsComponent} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/add-purchase-order-items/add-purchase-order-items.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AddPurchaseOrderItemsRoutingModule} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/add-purchase-order-items/add-purchase-order-items-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {BotoneraCardModule} from '@appComponents/shared/botonera-card/botonera-card.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {AddOrderItemModule} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/add-purchase-order-items/add-order-item/add-order-item.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AddPurchaseOrderItemsRoutingModule,
    TranslateModule,
    SearchModule,
    BotoneraCardModule,
    CheckBoxModule,
    WithoutResultsModule,
    CustomPositionPopUpModule,
    LoadingModule,
    VirtualScrollerModule,
    AddOrderItemModule,
    PqfCardModule,
    HeaderInternalSalesItemModule,
    InternalSalesItemModule,
  ],
  exports: [AddPurchaseOrderItemsComponent],
  declarations: [AddPurchaseOrderItemsComponent],
})
export class AddPurchaseOrderItemsModule {}
