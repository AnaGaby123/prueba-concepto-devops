import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PlanCollectionListComponent} from '@purchasing-manager/plan-collection/plan-collection-list/plan-collection-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PlanCollectionListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PlanCollectionListRoutingModule {}
