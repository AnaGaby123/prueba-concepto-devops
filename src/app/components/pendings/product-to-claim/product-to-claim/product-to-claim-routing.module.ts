/* Core Imports */
import {NgModule} from '@angular/core';

/* Module Imports */
import {RouterModule} from '@angular/router';

/* Component Imports */
import {ProductToClaimComponent} from '@appComponents/pendings/product-to-claim/product-to-claim/product-to-claim.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: ProductToClaimComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.productToClaim.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.productToClaim.list,
            loadChildren: () =>
              import('./product-to-claim-list/product-to-claim-list.module').then(
                (m) => m.ProductToClaimListModule,
              ),
          },
          {
            path: appRoutes.productToClaim.details,
            loadChildren: () =>
              import('./product-to-claim-details/product-to-claim-details.module').then(
                (m) => m.ProductToClaimDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProductToClaimRoutingModule {}
