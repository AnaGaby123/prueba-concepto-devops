import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuotationComponent} from '@appComponents/quotation/quotation.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: QuotationComponent,
        children: [
          {
            path: appRoutes.empty,
            pathMatch: 'full',
            redirectTo: appRoutes.quoter.dashboard,
          },
          {
            path: appRoutes.quoter.dashboard,
            loadChildren: () =>
              import('./quotation-dashboard/quotation-dashboard.module').then(
                (m) => m.QuotationDashboardModule,
              ),
          },
          {
            path: appRoutes.quoter.details,
            loadChildren: () =>
              import('./quotation-details/quotation-details.module').then(
                (m) => m.QuotationDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class QuotationRoutingModule {}
