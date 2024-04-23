import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegulatoryResearchComponent} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: RegulatoryResearchComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.regulatoryResearch.dashboard,
            pathMatch: 'full',
          },
          {
            path: appRoutes.regulatoryResearch.dashboard,
            loadChildren: () =>
              import('./regulatory-research-dashboard/regulatory-research-dashboard.module').then(
                (m) => m.RegulatoryResearchDashboardModule,
              ),
          },
          {
            path: appRoutes.regulatoryResearch.details,
            loadChildren: () =>
              import('./regulatory-research-details/regulatory-research-details.module').then(
                (m) => m.RegulatoryResearchDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RegulatoryResearchRoutingModule {}
