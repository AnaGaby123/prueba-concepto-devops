import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductsListComponent} from './products-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: ProductsListComponent}])],
  exports: [RouterModule],
})
export class ProductsListRoutingModule {}
