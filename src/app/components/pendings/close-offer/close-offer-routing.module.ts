import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CloseOfferGuard} from '@appGuards/pendings/close-offer/close-offer.guard';
import {CloseOfferComponent} from '@appComponents/pendings/close-offer/close-offer.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CloseOfferComponent,
        children: [
          {path: '', redirectTo: appRoutes.closeOffer.list, pathMatch: 'full'},
          {
            path: appRoutes.closeOffer.list,
            loadChildren: () =>
              import('./close-offer-list/close-offer-list.module').then(
                (m) => m.CloseOfferListModule,
              ),
          },
          {
            path: appRoutes.closeOffer.details,
            loadChildren: () =>
              import('./close-offer-details/close-offer-details.module').then(
                (m) => m.CloseOfferDetailsModule,
              ),
            canLoad: [CloseOfferGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CloseOfferRoutingModule {}
