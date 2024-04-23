import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegisterDispatchDetailsComponent} from '@appComponents/pendings/imports/register-dispatch/register-dispatch-details/register-dispatch-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: RegisterDispatchDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RegisterDispatchDetailsRoutingModule {}
