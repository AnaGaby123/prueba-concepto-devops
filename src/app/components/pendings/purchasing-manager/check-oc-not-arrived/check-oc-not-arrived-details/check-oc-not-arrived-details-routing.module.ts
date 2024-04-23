/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Components Imports */
import {CheckOcNotArrivedDetailsComponent} from '@purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-details/check-oc-not-arrived-details.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: CheckOcNotArrivedDetailsComponent}])],
  exports: [RouterModule],
})
export class CheckOcNotArrivedDetailsRoutingModule {}
