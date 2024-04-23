import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProvidersComponent} from './providers.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProvidersComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.catalogs.providers.listProviders,
            pathMatch: 'full',
          },
          {
            path: appRoutes.catalogs.providers.listProviders,
            loadChildren: () =>
              import('./list-providers/list-providers.module').then((m) => m.ListProvidersModule),
          },
          {
            path: appRoutes.catalogs.providers.addEditProviders,
            loadChildren: () =>
              import('./providers-details/providers-details.module').then(
                (m) => m.ProvidersDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProvidersRoutingModule {}
