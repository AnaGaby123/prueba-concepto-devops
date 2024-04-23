import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SecureShipmentComponent} from '@purchasing-manager/secure-shipment/secure-shipment.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SecureShipmentComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.secureShipment.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.secureShipment.list,
            loadChildren: () =>
              import('./secure-shipment-list/secure-shipment-list.module').then(
                (m) => m.SecureShipmentListModule,
              ),
          },
          {
            path: appRoutes.secureShipment.details,
            loadChildren: () =>
              import('./secure-shipment-details/secure-shipment-details.module').then(
                (m) => m.SecureShipmentDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SecureShipmentRoutingModule {}
