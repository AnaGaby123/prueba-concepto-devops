import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ControlSupplierClaimDetailsComponent} from '@appComponents/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-details/control-supplier-claim-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: ControlSupplierClaimDetailsComponent,
      },
    ]),
  ],
  exports: [],
})
export class ControlSupplierClaimDetailsRoutingModule {}
