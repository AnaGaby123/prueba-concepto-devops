import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FollowPurchasePromiseDetailsComponent} from '@appComponents/pendings/follow-purchase-promise/follow-purchase-promise-details/follow-purchase-promise-details.component';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([{path: '', component: FollowPurchasePromiseDetailsComponent}])],
  exports: [RouterModule],
})
export class FollowPurchasePromiseDetailsRoutingModule {}
