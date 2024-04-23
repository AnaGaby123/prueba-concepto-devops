import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegulatoryResearchDashboardComponent} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-dashboard/regulatory-research-dashboard.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RegulatoryResearchDashboardComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RegulatoryResearchDashboardRoutingModule {}
