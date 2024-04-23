/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Router Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

/* Components Imports */
import {ProductToClaimDetailsComponent} from '@appComponents/pendings/product-to-claim/product-to-claim/product-to-claim-details/product-to-claim-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: ProductToClaimDetailsComponent,
      },
    ]),
  ],
  exports: [],
})
export class ProductToClaimDetailsRoutingModule {}
