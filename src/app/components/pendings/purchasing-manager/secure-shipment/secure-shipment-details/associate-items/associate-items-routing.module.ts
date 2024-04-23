import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AssociateItemsComponent} from '@purchasing-manager/secure-shipment/secure-shipment-details/associate-items/associate-items.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AssociateItemsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AssociateItemsRoutingModule {}
