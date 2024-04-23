import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PlanCollectionDetailsComponent} from '@purchasing-manager/plan-collection/plan-collection-details/plan-collection-details.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: PlanCollectionDetailsComponent}])],
  exports: [RouterModule],
})
export class PlanCollectionDetailsRoutingModule {}
