import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CollectionMonitoringListComponent} from '@appComponents/pendings/charges/collection-monitoring/collection-monitoring-list/collection-monitoring-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: CollectionMonitoringListComponent}])],
  exports: [RouterModule],
})
export class CollectionMonitoringListRoutingModule {}
