import {NgModule} from '@angular/core';
import {InspectorDashboardComponent} from './inspector-dashboard.component';
import {RouterModule} from '@angular/router';

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([{path: '', component: InspectorDashboardComponent}])],
})
export class InspectorDashboardRoutingModule {}
