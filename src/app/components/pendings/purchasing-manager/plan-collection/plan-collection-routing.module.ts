import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PlanCollectionComponent} from '@purchasing-manager/plan-collection/plan-collection.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PlanCollectionComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.planCollection.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.planCollection.list,
            loadChildren: () =>
              import('./plan-collection-list/plan-collection-list.module').then(
                (m) => m.PlanCollectionListModule,
              ),
          },
          {
            path: appRoutes.planCollection.details,
            loadChildren: () =>
              import('./plan-collection-details/plan-collection-details.module').then(
                (m) => m.PlanCollectionDetailsModule,
              ),
            /* canLoad: [],*/
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PlanCollectionRoutingModule {}
