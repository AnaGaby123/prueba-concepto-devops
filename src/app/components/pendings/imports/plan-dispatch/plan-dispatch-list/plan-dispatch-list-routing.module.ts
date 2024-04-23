/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Components Imports */
import {PlanDispatchListComponent} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch-list/plan-dispatch-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: PlanDispatchListComponent}])],
  exports: [RouterModule],
  declarations: [],
})
export class PlanDispatchListRoutingModule {}
