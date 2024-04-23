import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FollowPurchasePromiseListComponent} from '@appComponents/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise-list.component';

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: [RouterModule.forChild([{path: '', component: FollowPurchasePromiseListComponent}])],
})
export class FollowPurchasePromiseListRoutingModule {}
