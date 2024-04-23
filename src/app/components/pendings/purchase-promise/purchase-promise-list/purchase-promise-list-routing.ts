import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PurchasePromiseListComponent} from '@appComponents/pendings/purchase-promise/purchase-promise-list/purchase-promise-list.component';

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild([{path: '', component: PurchasePromiseListComponent}])],
  exports: [RouterModule],
})
export class PurchasePromiseListRouting {}
