import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegisterConfirmationDetailsComponent} from '@purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: RegisterConfirmationDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RegisterConfirmationDetailsRoutingModule {}
