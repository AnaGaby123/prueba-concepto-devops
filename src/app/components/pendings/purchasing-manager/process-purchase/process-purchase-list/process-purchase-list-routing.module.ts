import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProcessPurchaseListComponent} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase-list/process-purchase-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: ProcessPurchaseListComponent}])],
  exports: [RouterModule],
  declarations: [],
})
export class ProcessPurchaseListRoutingModule {}
