import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReplacePurchaseOrderItemComponent} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/replace-purchase-order-item/replace-purchase-order-item.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: ReplacePurchaseOrderItemComponent}])],
  exports: [RouterModule],
})
export class ReplacePurchaseOrderItemRoutingModule {}
