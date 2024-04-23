import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ClientsComponent} from '@appComponents/catalogos/clients/clients.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ClientsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.catalogs.clients.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.catalogs.clients.list,
            loadChildren: () =>
              import('./clients-list/clients-list.module').then((m) => m.ClientsListModule),
          },
          {
            path: appRoutes.catalogs.clients.details,
            loadChildren: () =>
              import('./clients-details/clients-details.module').then(
                (m) => m.ClientsDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
