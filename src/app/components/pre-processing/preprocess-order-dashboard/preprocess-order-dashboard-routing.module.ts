import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PreprocessOrderDashboardComponent} from '@appComponents/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: PreprocessOrderDashboardComponent}])],
  exports: [RouterModule],
})
export class ClientPreProcessingRoutingModule {}
