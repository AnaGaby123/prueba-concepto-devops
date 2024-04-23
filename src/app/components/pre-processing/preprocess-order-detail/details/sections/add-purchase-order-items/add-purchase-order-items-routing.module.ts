import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AddPurchaseOrderItemsComponent} from '@appComponents/pre-processing/preprocess-order-detail/details/sections/add-purchase-order-items/add-purchase-order-items.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: AddPurchaseOrderItemsComponent}])],
  exports: [RouterModule],
})
export class AddPurchaseOrderItemsRoutingModule {}
