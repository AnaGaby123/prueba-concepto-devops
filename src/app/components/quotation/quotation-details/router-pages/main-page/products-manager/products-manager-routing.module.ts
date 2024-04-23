import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductsManagerComponent} from '@appComponents/quotation/quotation-details/router-pages/main-page/products-manager/products-manager.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: ProductsManagerComponent}])],
  exports: [RouterModule],
})
export class ProductsManagerRoutingModule {}
