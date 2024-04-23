/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Components Imports */
import {CheckOcNotArrivedComponent} from '@appComponents/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived.component';
/* Guard Imports */
import {CheckOcNotArrivedGuard} from '@appGuards/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CheckOcNotArrivedComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.checkOcNotArrived.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.checkOcNotArrived.list,
            loadChildren: () =>
              import('./check-oc-not-arrived-list/check-oc-not-arrived-list.module').then(
                (m) => m.CheckOcNotArrivedListModule,
              ),
          },
          {
            path: appRoutes.checkOcNotArrived.details,
            loadChildren: () =>
              import('./check-oc-not-arrived-details/check-oc-not-arrived-details.module').then(
                (m) => m.CheckOcNotArrivedDetails,
              ),
            canLoad: [CheckOcNotArrivedGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CheckOcNotArrivedRoutingModule {}
