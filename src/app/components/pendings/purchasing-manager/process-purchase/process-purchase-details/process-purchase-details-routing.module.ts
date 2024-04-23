import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProcessPurchaseDetailsComponent} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase-details/process-purchase-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProcessPurchaseDetailsComponent,

        children: [
          {
            path: '',
            redirectTo: appRoutes.processPurchase.details,
            pathMatch: 'full',
          },
          {
            path: appRoutes.processPurchase.details,
            loadChildren: () => import('./details/details.module').then((m) => m.DetailsModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProcessPurchaseDetailsRoutingModule {}
