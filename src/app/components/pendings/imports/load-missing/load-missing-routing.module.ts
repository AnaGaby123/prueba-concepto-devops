/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Components Imports */
import {LoadMissingComponent} from '@appComponents/pendings/imports/load-missing/load-missing.component';

/* Routes Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LoadMissingComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.loadMissing.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.loadMissing.list,
            loadChildren: () =>
              import('./load-missing-list/load-missing-list.module').then(
                (m) => m.LoadMissingListModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LoadMissingRoutingModule {}
