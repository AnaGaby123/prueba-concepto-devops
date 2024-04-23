/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Components Imports */
import {RegisterArrivalDetailsComponent} from '@purchasing-manager/register-arrival/register-arrival-details/register-arrival-details.component';

/* Guards Imports */
import {BarcodeGuard} from '@appGuards/pendings/purchasing-manager/register-arrival/barcode.guard';
import {StepsToFinalizeGuard} from '@appGuards/pendings/purchasing-manager/register-arrival/steps-to-finalize.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RegisterArrivalDetailsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.registerArrival.barcode,
            pathMatch: 'full',
          },
          {
            path: appRoutes.registerArrival.barcode,
            loadChildren: () => import('./barcode/barcode.module').then((m) => m.BarcodeModule),
            canLoad: [BarcodeGuard],
          },
          {
            path: appRoutes.registerArrival.stepsToFinalize,
            loadChildren: () =>
              import('./steps-to-finalize/steps-to-finalize.module').then(
                (m) => m.StepsToFinalizeModule,
              ),
            canLoad: [StepsToFinalizeGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RegisterArrivalDetailsRoutingModule {}
