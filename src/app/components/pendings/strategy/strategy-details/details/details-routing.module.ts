import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DetailsComponent} from '@appComponents/pendings/strategy/strategy-details/details/details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DetailsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.strategy.sectionList,
            pathMatch: 'full',
          },
          {
            path: appRoutes.strategy.sectionList,
            loadChildren: () =>
              import('./sections/list-strategies/list-strategies.module').then(
                (m) => m.ListStrategiesModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DetailsRoutingModule {}
