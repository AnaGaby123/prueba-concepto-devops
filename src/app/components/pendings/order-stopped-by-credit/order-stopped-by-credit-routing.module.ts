import {NgModule} from '@angular/core';
import {OrderStoppedByCreditComponent} from '@appComponents/pendings/order-stopped-by-credit/order-stopped-by-credit.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OrderStoppedByCreditComponent,
        children: [],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class OrderStoppedByCreditRoutingModule {}
