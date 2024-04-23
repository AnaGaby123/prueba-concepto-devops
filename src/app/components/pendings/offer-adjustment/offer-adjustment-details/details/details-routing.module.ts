import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DetailsComponent} from '@appComponents/pendings/offer-adjustment/offer-adjustment-details/details/details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DetailsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.offerAdjustment.sectionList,
            pathMatch: 'full',
          },
          {
            path: appRoutes.offerAdjustment.sectionList,
            loadChildren: () =>
              import('./sections/list-offer-adjustment/list-offer-adjustment.module').then(
                (m) => m.ListOfferAdjustmentModule,
              ),
          },
        ],
      },
    ]),
  ],
})
export class DetailsRoutingModule {}
