import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReplacePurchaseOrderItemComponent} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/replace-purchase-order-item/replace-purchase-order-item.component';
import {FormsModule} from '@angular/forms';
import {ReplacePurchaseOrderItemRoutingModule} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/replace-purchase-order-item/replace-purchase-order-item-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {CardModule} from '@appComponents/shared/card/card.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReplacePurchaseOrderItemRoutingModule,
    TranslateModule,
    SearchModule,
    CardModule,
    RadioButtonModule,
    WithoutResultsModule,
    VirtualScrollerModule,
  ],
  exports: [ReplacePurchaseOrderItemComponent],
  declarations: [ReplacePurchaseOrderItemComponent],
})
export class ReplacePurchaseOrderItemModule {}
