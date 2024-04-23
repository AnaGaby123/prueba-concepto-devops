/* Angular Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Routes Imports */
/* Components Imports */
import {LoadBalanceInFavorDetailsComponent} from '@appComponents/pendings/load-balance-in-favor/load-balance-in-favor-details/load-balance-in-favor-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: LoadBalanceInFavorDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LoadBalanceInFavorDetailsRoutingModule {}
