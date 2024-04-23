import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AttendInvestigationDetailsComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/attend-investigation-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: AttendInvestigationDetailsComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.attendInvestigation.details,
            pathMatch: 'full',
          },
          {
            path: appRoutes.attendInvestigation.details,
            loadChildren: () =>
              import('./product-details-investigation/product-details-investigation.module').then(
                (m) => m.ProductDetailsInvestigationModule,
              ),
          },
          {
            path: appRoutes.attendInvestigation.addProduct,
            loadChildren: () =>
              import('./product-details/product-details.module').then(
                (m) => m.ProductDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AttendInvestigationDetailsRoutingModule {}
