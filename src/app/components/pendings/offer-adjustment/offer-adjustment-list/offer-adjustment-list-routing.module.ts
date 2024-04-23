import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {OfferAdjustmentListComponent} from '@appComponents/pendings/offer-adjustment/offer-adjustment-list/offer-adjustment-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OfferAdjustmentListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class OfferAdjustmentListRoutingModule {}
