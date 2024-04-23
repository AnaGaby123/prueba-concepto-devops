import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ClientsDetailsComponent} from '@appComponents/catalogos/clients/clients-details/clients-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';
import {TabsMenuGuard} from '@appGuards/catalogs/clients/details/tabs/tabs-menu.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: ClientsDetailsComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.catalogs.clients.generalData,
            pathMatch: 'full',
          },
          {
            path: appRoutes.catalogs.clients.generalData,
            loadChildren: () =>
              import('./general-data/general-data.module').then((m) => m.GeneralDataModule),
            canLoad: [TabsMenuGuard],
          },
          {
            path: appRoutes.catalogs.clients.address,
            loadChildren: () => import('./address/address.module').then((m) => m.AddressModule),
            canLoad: [TabsMenuGuard],
          },
          {
            path: appRoutes.catalogs.clients.charges,
            loadChildren: () => import('./charges/charges.module').then((m) => m.ChargesModule),
            canLoad: [TabsMenuGuard],
          },
          {
            path: appRoutes.catalogs.clients.prices,
            loadChildren: () => import('./prices/prices.module').then((m) => m.PricesModule),
            canLoad: [TabsMenuGuard],
          },
          {
            path: appRoutes.catalogs.clients.deliveryBilling,
            loadChildren: () =>
              import('./delivery-billing/delivery-billing.module').then(
                (m) => m.DeliveryBillingModule,
              ),
            canLoad: [TabsMenuGuard],
          },
          {
            path: appRoutes.catalogs.clients.contracts,
            loadChildren: () =>
              import('./contracts/contracts.module').then((m) => m.ContractsModule),
            canLoad: [TabsMenuGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ClientsDetailsRoutingModule {}
