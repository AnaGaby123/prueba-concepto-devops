import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuarantineManagerComponent} from '@appComponents/pendings/resource-manager/quarantine-manager/quarantine-manager.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: QuarantineManagerComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.quarantineManager.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.quarantineManager.list,
            loadChildren: () =>
              import('./quarantine-manager-list/quarantine-manager-list.module').then(
                (m) => m.QuarantineManagerListModule,
              ),
          },
          {
            path: appRoutes.quarantineManager.details,
            loadChildren: () =>
              import('./quarantine-manager-details/quarantine-manager-details.module').then(
                (m) => m.QuarantineManagerDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class QuarantineManagerRoutingModule {}
