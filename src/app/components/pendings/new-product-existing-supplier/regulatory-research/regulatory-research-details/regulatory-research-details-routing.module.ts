import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegulatoryResearchDetailsComponent} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: RegulatoryResearchDetailsComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.regulatoryResearch.commercialTechnicalResearch,
            pathMatch: 'full',
          },
          {
            path: appRoutes.regulatoryResearch.commercialTechnicalResearch,
            loadChildren: () =>
              import('./commercial-technical-research/commercial-technical-research.module').then(
                (m) => m.CommercialTechnicalResearchModule,
              ),
          },
          {
            path: appRoutes.regulatoryResearch.regulationAndNonTariffRestrictions,
            loadChildren: () =>
              import('./regulation-and-restrictions/regulation-and-restrictions.module').then(
                (m) => m.RegulationAndRestrictionsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RegulatoryResearchDetailsRoutingModule {}
