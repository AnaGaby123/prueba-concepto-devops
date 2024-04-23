import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PurchasePromiseComponent} from '@appComponents/pendings/purchase-promise/purchase-promise.component';
import {PurchasePromiseGuard} from '@appGuards/pendings/purchase-promise/purchase-promise.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PurchasePromiseComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.purchasePromise.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.purchasePromise.list,
            loadChildren: () =>
              import('./purchase-promise-list/purchase-promise-list.module').then(
                (m) => m.PurchasePromiseListModule,
              ),
          },
          {
            path: appRoutes.purchasePromise.details,
            loadChildren: () =>
              import('./purchase-promise-details/purchase-promise-details.module').then(
                (m) => m.PurchasePromiseDetailsModule,
              ),
            canLoad: [PurchasePromiseGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PurchasePromiseRoutingModule {}
