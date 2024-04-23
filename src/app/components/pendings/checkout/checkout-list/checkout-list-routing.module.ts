import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CheckoutListComponent} from '@appComponents/pendings/checkout/checkout-list/checkout-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CheckoutListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CheckoutListRoutingModule {}
