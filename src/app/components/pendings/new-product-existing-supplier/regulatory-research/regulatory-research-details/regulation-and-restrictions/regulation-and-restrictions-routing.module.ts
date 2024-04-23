import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegulationAndRestrictionsComponent} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulation-and-restrictions/regulation-and-restrictions.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: RegulationAndRestrictionsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RegulationAndRestrictionsRoutingModule {}
