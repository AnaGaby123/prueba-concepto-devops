import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {OfflineProductComponent} from '@appComponents/quotation/quotation-details/router-pages/offline-product/offline-product.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: OfflineProductComponent}])],
  exports: [RouterModule],
})
export class OfflineProductRoutingModule {}
