import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {OrderModificationComponent} from '@appComponents/pendings/order-modification/order-modification.component';
import {OrderModificationDetailsGuard} from '@appGuards/pendings/order-modification/order-modification-details.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OrderModificationComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.orderModification.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.orderModification.list,
            loadChildren: () =>
              import('./order-modification-list/order-modification-list.module').then(
                (m) => m.OrderModificationListModule,
              ),
          },
          {
            path: appRoutes.orderModification.details,
            loadChildren: () =>
              import('./order-modification-details/order-modification-details.module').then(
                (m) => m.OrderModificationDetailsModule,
              ),
            canLoad: [OrderModificationDetailsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class OrderModificationRoutingModule {}
