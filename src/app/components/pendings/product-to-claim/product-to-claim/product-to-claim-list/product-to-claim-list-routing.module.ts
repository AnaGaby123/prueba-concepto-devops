/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Routes Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

/* Components Imports */
import {ProductToClaimListComponent} from '@appComponents/pendings/product-to-claim/product-to-claim/product-to-claim-list/product-to-claim-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: ProductToClaimListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProductToClaimListRoutingModule {}
