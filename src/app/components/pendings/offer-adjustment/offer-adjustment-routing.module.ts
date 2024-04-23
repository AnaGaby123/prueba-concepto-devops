import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {OfferAdjustmentComponent} from '@appComponents/pendings/offer-adjustment/offer-adjustment.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OfferAdjustmentComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.offerAdjustment.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.offerAdjustment.list,
            loadChildren: () =>
              import('./offer-adjustment-list/offer-adjustment-list.module').then(
                (m) => m.OfferAdjustmentListModule,
              ),
          },
          {
            path: appRoutes.offerAdjustment.adjustmentDetails,
            loadChildren: () =>
              import('./offer-adjustment-details/offer-adjustment-details.module').then(
                (m) => m.OfferAdjustmentDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class OfferAdjustmentRoutingModule {}
