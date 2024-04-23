import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FollowPurchasePromiseComponent} from '@appComponents/pendings/follow-purchase-promise/follow-purchase-promise.component';
import {FollowPurchasePromiseDetailsGuard} from '@appGuards/pendings/follow-purchase-promise/follow-purchase-promise-details.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: FollowPurchasePromiseComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.followPurchasePromise.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.followPurchasePromise.list,
            loadChildren: () =>
              import('./follow-purchase-promise-list/follow-purchase-promise-list.module').then(
                (m) => m.FollowPurchasePromiseListModule,
              ),
          },
          {
            path: appRoutes.followPurchasePromise.details,
            loadChildren: () =>
              import(
                './follow-purchase-promise-details/follow-purchase-promise-details.module'
              ).then((m) => m.FollowPurchasePromiseDetailsModule),
            canLoad: [FollowPurchasePromiseDetailsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class FollowPurchasePromiseRoutingModule {}
