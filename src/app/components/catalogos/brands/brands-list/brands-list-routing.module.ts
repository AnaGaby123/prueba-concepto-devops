import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrandsListComponent} from '@appComponents/catalogos/brands/brands-list/brands-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: BrandsListComponent}])],
  exports: [RouterModule],
})
export class BrandsListRoutingModule {}
