import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ShippingConsoleListComponent} from '@appComponents/pendings/operations-manager/shipping-console/shipping-console-list/shipping-console-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ShippingConsoleListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ShippingConsoleListRoutingModule {}
