import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PurchaseOrdersComponent} from '@purchasing-manager/secure-shipment/secure-shipment-details/purchase-orders/purchase-orders.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PurchaseOrdersComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PurchaseOrdersRoutingModule {}
