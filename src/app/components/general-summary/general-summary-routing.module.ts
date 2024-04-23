import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GeneralSummaryComponent} from '@appComponents/general-summary/general-summary.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: GeneralSummaryComponent,
        children: [
          {path: '', redirectTo: appRoutes.generalSummary.generalSummary, pathMatch: 'full'},
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class GeneralSummaryRoutingModule {}
