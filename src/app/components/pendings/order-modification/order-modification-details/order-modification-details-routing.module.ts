import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {OrderModificationDetailsComponent} from '@appComponents/pendings/order-modification/order-modification-details/order-modification-details.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OrderModificationDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class OrderModificationDetailsRoutingModule {}
