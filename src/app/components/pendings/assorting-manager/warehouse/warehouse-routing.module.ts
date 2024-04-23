/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Components Imports */
import {WarehouseComponent} from '@appComponents/pendings/assorting-manager/warehouse/warehouse.component';

/* Routes Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: WarehouseComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.warehouse.dashboard,
            pathMatch: 'full',
          },
          {
            path: appRoutes.warehouse.dashboard,
            loadChildren: () =>
              import('./warehouse-dashboard/warehouse-dashboard.module').then(
                (m) => m.WarehouseDashboardModule,
              ),
          },
          {
            path: appRoutes.warehouse.details,
            loadChildren: () =>
              import('./warehouse-details/warehouse-details.module').then(
                (m) => m.WarehouseDetailsModule,
              ),
            // TODO: Agregar Guard
            canLoad: [],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class WarehouseRoutingModule {}
