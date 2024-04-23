import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AttendReviewComponent} from '@appComponents/pendings/charges/attend-review/attend-review.component';
import {AttendReviewDetailsGuard} from '@appGuards/pendings/charges/attend-review/attend-review-details.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AttendReviewComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.attendReview.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.attendReview.list,
            loadChildren: () =>
              import('./attend-review-list/attend-review-list.module').then(
                (m) => m.AttendReviewListModule,
              ),
          },
          {
            path: appRoutes.attendReview.details,
            loadChildren: () =>
              import('./attend-review-details/attend-review-details.module').then(
                (m) => m.AttendReviewDetailsModule,
              ),
            canLoad: [AttendReviewDetailsGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AttendReviewRoutingModule {}
