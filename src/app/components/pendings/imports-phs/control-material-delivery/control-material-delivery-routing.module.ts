import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ControlMaterialDeliveryComponent} from '@appComponents/pendings/imports-phs/control-material-delivery/control-material-delivery.component';
import {ControlMaterialDeliveryGuard} from '@appGuards/pendings/imports-phs/control-material-delivery/control-material-delivery.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ControlMaterialDeliveryComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.controlMaterialDelivery.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.controlMaterialDelivery.list,
            loadChildren: () =>
              import('./control-material-delivery-list/control-material-delivery-list.module').then(
                (m) => m.ControlMaterialDeliveryListModule,
              ),
          },
          {
            path: appRoutes.controlMaterialDelivery.details,
            loadChildren: () =>
              import(
                './control-material-delivery-details/control-material-delivery-details.module'
              ).then((m) => m.ControlMaterialDeliveryDetailsModule),
            canLoad: [ControlMaterialDeliveryGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ControlMaterialDeliveryRoutingModule {}
