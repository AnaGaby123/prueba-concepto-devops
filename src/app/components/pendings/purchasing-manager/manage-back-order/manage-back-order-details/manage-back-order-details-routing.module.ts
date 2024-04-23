import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ManageBackOrderDetailsComponent} from '@purchasing-manager/manage-back-order/manage-back-order-details/manage-back-order-details.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: ManageBackOrderDetailsComponent}])],
  exports: [RouterModule],
})
export class ManageBackOrderDetailsRoutingModule {}
