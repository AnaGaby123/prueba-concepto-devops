import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ControlSupplierClaimComponent} from '@appComponents/pendings/product-to-claim/control-supplier-claim/control-supplier-claim.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: ControlSupplierClaimComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.controlSupplierClaim.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.controlSupplierClaim.list,
            loadChildren: () =>
              import('./control-supplier-claim-list/control-supplier-claim-list.module').then(
                (m) => m.ControlSupplierClaimListModule,
              ),
          },
          {
            path: appRoutes.controlSupplierClaim.details,
            loadChildren: () =>
              import('./control-supplier-claim-details/control-supplier-claim-details.module').then(
                (m) => m.ControlSupplierClaimDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ControlSupplierClaimRoutingModule {}
