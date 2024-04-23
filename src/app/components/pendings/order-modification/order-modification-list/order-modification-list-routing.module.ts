import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {OrderModificationListComponent} from '@appComponents/pendings/order-modification/order-modification-list/order-modification-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: OrderModificationListComponent}])],
  exports: [RouterModule],
})
export class OrderModificationListRoutingModule {}
