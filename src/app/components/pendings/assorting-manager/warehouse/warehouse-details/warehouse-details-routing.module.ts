/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Components Imports */
import {WarehouseDetailsComponent} from '@appComponents/pendings/assorting-manager/warehouse/warehouse-details/warehouse-details.component';

/* Routes Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: WarehouseDetailsComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.warehouse.clients,
            pathMatch: 'full',
          },
          {
            path: appRoutes.warehouse.clients,
            loadChildren: () => import('./clients/clients.module').then((m) => m.ClientsModule),
          },
          {
            path: appRoutes.warehouse.clientInfo,
            loadChildren: () =>
              import('./client-info/client-info.module').then((m) => m.ClientInfoModule),
            // TODO: Agregar Guard
            canLoad: [],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class WarehouseDetailsRoutingModule {}
