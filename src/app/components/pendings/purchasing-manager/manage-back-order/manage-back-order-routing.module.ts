import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ManageBackOrderComponent} from '@appComponents/pendings/purchasing-manager/manage-back-order/manage-back-order.component';
import {ManageBackOrderGuard} from '@appGuards/pendings/purchasing-manager/manage-back-order/manage-back-order.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ManageBackOrderComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.manageBackOrder.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.manageBackOrder.list,
            loadChildren: () =>
              import('./manage-back-order-list/manage-back-order-list.module').then(
                (m) => m.ManageBackOrderListModule,
              ),
          },
          {
            path: appRoutes.manageBackOrder.details,
            loadChildren: () =>
              import('./manage-back-order-details/manage-back-order-details.module').then(
                (m) => m.ManageBackOrderDetailsModule,
              ),
            canLoad: [ManageBackOrderGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ManageBackOrderRoutingModule {}
