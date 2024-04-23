import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PackagingDashboardComponent} from '@appComponents/pendings/storer/packaging/packaging-dashboard/packaging-dashboard.component';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([{path: '', component: PackagingDashboardComponent}])],
})
export class PackagingDashboardRoutingModule {}
