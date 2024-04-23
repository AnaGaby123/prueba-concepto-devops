import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CloseOfferListComponent} from '@appComponents/pendings/close-offer/close-offer-list/close-offer-list.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CloseOfferListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CloseOfferListRoutingModule {}
