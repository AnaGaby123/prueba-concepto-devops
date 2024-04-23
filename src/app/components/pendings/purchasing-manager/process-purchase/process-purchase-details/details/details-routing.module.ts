import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DetailsComponent} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase-details/details/details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DetailsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.processPurchase.generateOrder,
            pathMatch: 'full',
          },
          {
            path: appRoutes.processPurchase.generateOrder,
            loadChildren: () => import('./generate/generate.module').then((m) => m.GenerateModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DetailsRoutingModule {}
