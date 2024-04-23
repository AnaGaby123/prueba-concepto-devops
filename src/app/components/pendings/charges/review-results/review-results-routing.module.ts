import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ReviewResultsComponent} from '@appComponents/pendings/charges/review-results/review-results.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: ReviewResultsComponent}])],
  exports: [RouterModule],
})
export class ReviewResultsRoutingModule {}
