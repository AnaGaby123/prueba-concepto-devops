import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CollectionMonitoringDetailsComponent} from '@appComponents/pendings/charges/collection-monitoring/collection-monitoring-details/collection-monitoring-details.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: CollectionMonitoringDetailsComponent}])],
  exports: [RouterModule],
})
export class CollectionMonitoringDetailsRoutingModule {}
