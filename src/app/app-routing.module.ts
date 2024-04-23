import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoreContainerComponent} from './components/core-container/core-container.component';
import {AuthGuardService} from '@appGuards/auth/auth-guard.service';
import {GeneralRouteGuard} from '@appGuards/core/general-route.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: appRoutes.login,
    pathMatch: 'full',
  },
  {
    path: appRoutes.login,
    // canActivate: [LoginGuardService],
    loadChildren: () => import('./components/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: appRoutes.forgotPassword,
    loadChildren: () =>
      import('./components/auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule,
      ),
  },
  {
    path: appRoutes.protected,
    component: CoreContainerComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: appRoutes.pendings.pendings,
        pathMatch: 'full',
      },
      {
        path: appRoutes.pendings.pendings,
        loadChildren: () =>
          import('@appComponents/pendings/pending.module').then((m) => m.PendingModule),
        canLoad: [GeneralRouteGuard],
        canActivate: [GeneralRouteGuard],
      },
      {
        path: appRoutes.improvements.improvements,
        loadChildren: () =>
          import('./components/under-construction/under-construction.module').then(
            (m) => m.UnderConstructionModule,
          ),
        canLoad: [GeneralRouteGuard],
        canActivate: [GeneralRouteGuard],
      },
      {
        path: appRoutes.incident.incident,
        loadChildren: () =>
          import('./components/under-construction/under-construction.module').then(
            (m) => m.UnderConstructionModule,
          ),
        canLoad: [GeneralRouteGuard],
        canActivate: [GeneralRouteGuard],
      },
      {
        path: appRoutes.request.request,
        loadChildren: () =>
          import('./components/under-construction/under-construction.module').then(
            (m) => m.UnderConstructionModule,
          ),
        canLoad: [GeneralRouteGuard],
        canActivate: [GeneralRouteGuard],
      },
      {
        path: appRoutes.management.management,
        loadChildren: () =>
          import('./components/under-construction/under-construction.module').then(
            (m) => m.UnderConstructionModule,
          ),
        canLoad: [GeneralRouteGuard],
        canActivate: [GeneralRouteGuard],
      },
      /*{
        path: 'customerCatalog',
        loadChildren: () =>
          import('./components/catalogos/clientes/clientes.module').then(
            (m) => m.ClientesModule,
          ),
      },*/
      {
        path: appRoutes.catalogs.catalogs,
        loadChildren: () =>
          import('./components/catalogos/catalogos-home/catalogos-home.module').then(
            (m) => m.CatalogosHomeModule,
          ),
        canLoad: [GeneralRouteGuard],
        canActivate: [GeneralRouteGuard],
      },
      {
        path: appRoutes.catalogs.catalogs + '/' + appRoutes.catalogs.clients.clients,
        loadChildren: () =>
          import('./components/catalogos/clients/clients.module').then((m) => m.ClientsModule),
        canLoad: [GeneralRouteGuard],
        canActivate: [GeneralRouteGuard],
      },
      {
        path: appRoutes.catalogs.catalogs + '/' + appRoutes.catalogs.providers.providers,
        loadChildren: () =>
          import('./components/catalogos/providers/providers.module').then(
            (m) => m.ProvidersModule,
          ),
        canLoad: [GeneralRouteGuard],
        canActivate: [GeneralRouteGuard],
      },
      {
        path: appRoutes.catalogs.catalogs + '/' + appRoutes.catalogs.products.products,
        loadChildren: () =>
          import('./components/catalogos/products/products.module').then((m) => m.ProductsModule),
        canLoad: [GeneralRouteGuard],
        canActivate: [GeneralRouteGuard],
      },
      {
        path: appRoutes.catalogs.catalogs + '/' + appRoutes.catalogs.brands.brands,
        loadChildren: () =>
          import('./components/catalogos/brands/brands.module').then((m) => m.BrandsModule),
        canLoad: [GeneralRouteGuard],
        canActivate: [GeneralRouteGuard],
      },
      {
        path:
          `${appRoutes.catalogs.catalogs}` +
          '/' +
          `${appRoutes.catalogs.customsAgents.customsAgents}`,
        loadChildren: () =>
          import('./components/catalogos/customs-agents/customs-agents.module').then(
            (m) => m.CustomsAgentsModule,
          ),
        canLoad: [GeneralRouteGuard],
        canActivate: [GeneralRouteGuard],
      },
      /*{
        path: 'client',
        loadChildren: () =>
          import('./components/catalogos/clientes/clientes.module').then(
            (m) => m.ClientesModule,
          ),
      },
      {
        path: 'provider',
        loadChildren: () =>
          import('./components/catalogos/providers/providers.module').then(
            (m) => m.ProvidersModule,
          ),
      },*/
      {
        path: appRoutes.construction.configuration,
        loadChildren: () =>
          import('./components/under-construction/under-construction.module').then(
            (m) => m.UnderConstructionModule,
          ),
        canLoad: [GeneralRouteGuard],
        canActivate: [GeneralRouteGuard],
      },
      {path: appRoutes.notFound, redirectTo: appRoutes.protected},
    ],
  },
  {
    path: appRoutes.notFound,
    redirectTo: appRoutes.login,
  },
  // {path: 'clientes', component: ClientesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
