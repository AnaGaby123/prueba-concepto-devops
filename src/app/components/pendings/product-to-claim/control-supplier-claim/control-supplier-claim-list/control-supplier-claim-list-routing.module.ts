import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ControlSupplierClaimListComponent} from '@appComponents/pendings/product-to-claim/control-supplier-claim/control-supplier-claim-list/control-supplier-claim-list.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: ControlSupplierClaimListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ControlSupplierClaimListRoutingModule {}
