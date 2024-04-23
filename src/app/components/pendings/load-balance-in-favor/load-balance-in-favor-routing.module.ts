/* Angular Imports */
import {NgModule} from '@angular/core';

/* Module Imports */
import {RouterModule} from '@angular/router';

/* Component Imports */
import {LoadBalanceInFavorComponent} from '@appComponents/pendings/load-balance-in-favor/load-balance-in-favor.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: LoadBalanceInFavorComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.loadBalanceInFavor.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.loadBalanceInFavor.list,
            loadChildren: () =>
              import('./load-balance-in-favor-list/load-balance-in-favor-list.module').then(
                (m) => m.LoadBalanceInFavorListModule,
              ),
          },
          {
            path: appRoutes.loadBalanceInFavor.details,
            loadChildren: () =>
              import('./load-balance-in-favor-details/load-balance-in-favor-details.module').then(
                (m) => m.LoadBalanceInFavorDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LoadBalanceInFavorRoutingModule {}
