/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Components Imports */
import {CheckOcNotArrivedListComponent} from '@appComponents/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-list/check-oc-not-arrived-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: CheckOcNotArrivedListComponent}])],
  exports: [RouterModule],
})
export class CheckOcNotArrivedListRoutingModule {}
