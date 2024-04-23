import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PackagingDetailsComponent} from '@appComponents/pendings/storer/packaging/packaging-details/packaging-details.component';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([{path: '', component: PackagingDetailsComponent}])],
})
export class PackagingDetailsRoutingModule {}
