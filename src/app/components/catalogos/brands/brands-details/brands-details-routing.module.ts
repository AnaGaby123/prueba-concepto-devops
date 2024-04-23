import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrandsDetailsComponent} from '@appComponents/catalogos/brands/brands-details/brands-details.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: BrandsDetailsComponent}])],
  exports: [RouterModule],
})
export class BrandsDetailsRoutingModule {}
