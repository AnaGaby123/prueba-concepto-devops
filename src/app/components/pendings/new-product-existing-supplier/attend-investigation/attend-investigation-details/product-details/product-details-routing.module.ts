import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductDetailsComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details/product-details.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: ProductDetailsComponent}])],
  exports: [RouterModule],
})
export class ProductDetailsRoutingModule {}
