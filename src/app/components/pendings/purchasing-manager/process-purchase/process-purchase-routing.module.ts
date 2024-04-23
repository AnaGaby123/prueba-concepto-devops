import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProcessPurchaseComponent} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase.component';
import {ProcessPurchaseGuard} from '@appGuards/pendings/purchasing-manager/process-purchase/process-purchase.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProcessPurchaseComponent,

        children: [
          {
            path: '',
            redirectTo: appRoutes.processPurchase.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.processPurchase.list,
            loadChildren: () =>
              import('./process-purchase-list/process-purchase-list.module').then(
                (m) => m.ProcessPurchaseListModule,
              ),
          },
          {
            path: appRoutes.processPurchase.purchaseDetails,
            loadChildren: () =>
              import('./process-purchase-details/process-purchase-details.module').then(
                (m) => m.ProcessPurchaseDetailsModule,
              ),
            canLoad: [ProcessPurchaseGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class ProcessPurchaseRoutingModule {}
