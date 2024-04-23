/* Core Imports */
import {NgModule} from '@angular/core';

/* Module Imports */
import {RouterModule} from '@angular/router';

/* Component Imports */
import {StrategyComponent} from '@appComponents/pendings/strategy/strategy.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: StrategyComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.strategy.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.strategy.list,
            loadChildren: () =>
              import('./strategy-dashboard/strategy-dashboard.module').then(
                (m) => m.StrategyDashboardModule,
              ),
          },
          {
            path: appRoutes.strategy.strategyDetails,
            loadChildren: () =>
              import('./strategy-details/strategy-details.module').then(
                (m) => m.StrategyDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class StrategyRoutingModule {}
