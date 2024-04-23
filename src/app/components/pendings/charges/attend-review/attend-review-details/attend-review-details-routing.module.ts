import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AttendReviewDetailsComponent} from '@appComponents/pendings/charges/attend-review/attend-review-details/attend-review-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AttendReviewDetailsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.review.review,
            pathMatch: 'full',
          },
          {
            path: appRoutes.review.review,
            loadChildren: () => import('./review/review.module').then((m) => m.ReviewModule),
          },
          {
            path: appRoutes.rebill.rebill,
            loadChildren: () => import('./rebill/rebill.module').then((m) => m.RebillModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AttendReviewDetailsRoutingModule {}
