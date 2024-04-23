/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Routes Imports */
/* Components Imports */
import {ClientInfoComponent} from '@appComponents/pendings/assorting-manager/warehouse/warehouse-details/client-info/client-info.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: ClientInfoComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ClientInfoRoutingModule {}
