/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Components Imports */
import {WarehouseDashboardComponent} from '@appComponents/pendings/assorting-manager/warehouse/warehouse-dashboard/warehouse-dashboard.component';

/* Routes Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: WarehouseDashboardComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class WarehouseDashboardRoutingModule {}
