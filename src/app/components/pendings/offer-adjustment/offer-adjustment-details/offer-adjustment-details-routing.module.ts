import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {OfferAdjustmentDetailsComponent} from '@appComponents/pendings/offer-adjustment/offer-adjustment-details/offer-adjustment-details.component';
import {OfferAdjustmentGuard} from '@appGuards/pendings/offer-adjustment/offer-adjustment.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OfferAdjustmentDetailsComponent,
        canActivate: [OfferAdjustmentGuard],
        children: [
          {
            path: '',
            redirectTo: appRoutes.offerAdjustment.details,
            pathMatch: 'full',
          },
          {
            path: appRoutes.offerAdjustment.details,
            loadChildren: () => import('./details/details.module').then((m) => m.DetailsModule),
          },
        ],
      },
    ]),
  ],
})
export class OfferAdjustmentDetailsRoutingModule {}
