import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReviewComponent} from '@appComponents/pendings/charges/attend-review/attend-review-details/review/review.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ReviewComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ReviewRoutingModule {}
