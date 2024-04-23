import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {StrategyDetailsComponent} from '@appComponents/pendings/strategy/strategy-details/strategy-details.component';
import {StrategyDetailsGuardService} from '@appGuards/strategy/strategy-details-guard.service';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StrategyDetailsComponent,
        canActivate: [StrategyDetailsGuardService],
        children: [
          {
            path: '',
            redirectTo: appRoutes.strategy.details,
            pathMatch: 'full',
          },
          {
            path: appRoutes.strategy.details,
            loadChildren: () => import('./details/details.module').then((m) => m.DetailsModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class StrategyDetailsRoutingModule {}
