/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Components Imports */
import {LoadBalanceInFavorListComponent} from '@appComponents/pendings/load-balance-in-favor/load-balance-in-favor-list/load-balance-in-favor-list.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: LoadBalanceInFavorListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LoadBalanceInFavorListRoutingModule {}
