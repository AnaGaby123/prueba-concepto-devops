import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommercialTechnicalResearchComponent} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/commercial-technical-research/commercial-technical-research.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: CommercialTechnicalResearchComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CommercialTechnicalResearchRoutingModule {}
