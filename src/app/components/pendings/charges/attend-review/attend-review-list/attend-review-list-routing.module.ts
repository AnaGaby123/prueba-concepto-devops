import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AttendReviewListComponent} from '@appComponents/pendings/charges/attend-review/attend-review-list/attend-review-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: AttendReviewListComponent}])],
  exports: [RouterModule],
})
export class AttendReviewListRoutingModule {}
