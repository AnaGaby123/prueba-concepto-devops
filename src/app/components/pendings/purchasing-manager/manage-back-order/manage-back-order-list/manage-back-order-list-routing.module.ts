import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ManageBackOrderListComponent} from '@appComponents/pendings/purchasing-manager/manage-back-order/manage-back-order-list/manage-back-order-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: ManageBackOrderListComponent}])],
  exports: [RouterModule],
})
export class ManageBackOrderListRoutingModule {}
