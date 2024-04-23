import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuotationDashboardComponent} from '@appComponents/quotation/quotation-dashboard/quotation-dashboard.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: QuotationDashboardComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class QuotationDashboardRoutingModule {}
