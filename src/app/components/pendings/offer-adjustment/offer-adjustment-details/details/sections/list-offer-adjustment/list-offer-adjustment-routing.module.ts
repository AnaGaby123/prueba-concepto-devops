import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ListOfferAdjustmentComponent} from '@appComponents/pendings/offer-adjustment/offer-adjustment-details/details/sections/list-offer-adjustment/list-offer-adjustment.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ListOfferAdjustmentComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ListOfferAdjustmentRoutingModule {}
