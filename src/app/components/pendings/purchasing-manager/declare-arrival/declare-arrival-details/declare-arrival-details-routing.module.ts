import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DeclareArrivalDetailsComponent} from '@purchasing-manager/declare-arrival/declare-arrival-details/declare-arrival-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: DeclareArrivalDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DeclareArrivalDetailsRoutingModule {}
