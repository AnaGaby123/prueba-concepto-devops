/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Component Imports */
import {ExecuteCollectionComponent} from '@appComponents/pendings/charges/execute-collection/execute-collection.component';

import {ExecuteCollectionDetailsGuard} from '@appGuards/pendings/charges/execute-collection/execute-collection-details.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ExecuteCollectionComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.executeCollection.calendar,
            pathMatch: 'full',
          },
          {
            path: appRoutes.executeCollection.calendar,
            loadChildren: () =>
              import('./execute-collection-calendar/execute-collection-calendar.module').then(
                (m) => m.ExecuteCollectionCalendarModule,
              ),
          },
          {
            path: appRoutes.executeCollection.details,
            loadChildren: () =>
              import('./execute-collection-details/execute-collection-details.module').then(
                (m) => m.ExecuteCollectionDetailsModule,
              ),
            canLoad: [ExecuteCollectionDetailsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ExecuteCollectionRoutingModule {}
