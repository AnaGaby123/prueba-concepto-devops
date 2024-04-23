import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ChangeNoticesComponent} from '@appComponents/pendings/change-notices/change-notices.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: ChangeNoticesComponent,
        children: [
          {path: appRoutes.empty, redirectTo: appRoutes.changeNotice.list, pathMatch: 'full'},
          {
            path: appRoutes.changeNotice.list,
            loadChildren: () =>
              import('./change-notices-list/change-notices-list.module').then(
                (m) => m.ChangeNoticesListModule,
              ),
          },
          {
            path: appRoutes.changeNotice.details,
            loadChildren: () =>
              import('./change-notices-details/change-notices-details.module').then(
                (m) => m.ChangeNoticesDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ChangeNoticesRoutingModule {}
