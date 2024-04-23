import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DeclareArrivalGuideComponent} from '@appComponents/pendings/material-receiver/declare-arrival-guide/declare-arrival-guide.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DeclareArrivalGuideComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.declareArrival.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.declareArrival.list,
            loadChildren: () =>
              import('./declare-arrival-guide-list/declare-arrival-guide-list.module').then(
                (m) => m.DeclareArrivalGuideListModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DeclareArrivalGuideRoutingModule {}
