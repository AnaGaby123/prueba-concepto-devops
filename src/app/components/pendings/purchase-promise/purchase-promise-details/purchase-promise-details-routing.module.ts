import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PurchasePromiseDetailsComponent} from '@appComponents/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.component';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([{path: '', component: PurchasePromiseDetailsComponent}])],
  exports: [RouterModule],
})
export class PurchasePromiseDetailsRoutingModule {}
