/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Components Imports */
import {ClientsComponent} from '@appComponents/pendings/assorting-manager/warehouse/warehouse-details/clients/clients.component';

/* Routes Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: ClientsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
