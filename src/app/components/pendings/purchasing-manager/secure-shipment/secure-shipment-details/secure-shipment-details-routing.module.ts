import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SecureShipmentDetailsComponent} from '@purchasing-manager/secure-shipment/secure-shipment-details/secure-shipment-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SecureShipmentDetailsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.secureShipment.details,
            pathMatch: 'full',
          },
          {
            path: appRoutes.secureShipment.details,
            loadChildren: () =>
              import('./purchase-orders/purchase-orders.module').then(
                (m) => m.PurchaseOrdersModule,
              ),
          },
          {
            path: appRoutes.secureShipment.seeResume,
            loadChildren: () =>
              import('./see-resume/see-resume.module').then((m) => m.SeeResumeModule),
          },
          {
            path: appRoutes.secureShipment.associateItems,
            loadChildren: () =>
              import('./associate-items/associate-items.module').then(
                (m) => m.AssociateItemsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SecureShipmentDetailsRoutingModule {}
