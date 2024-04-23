import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegisterConfirmationComponent} from '@appComponents/pendings/purchasing-manager/register-confirmation/register-confirmation.component';
import {RegisterConfirmationDetailsGuard} from '@appGuards/pendings/purchasing-manager/register-confirmation/register-confirmation-details.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RegisterConfirmationComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.registerConfirmation.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.registerConfirmation.list,
            loadChildren: () =>
              import('./register-confirmation-list/register-confirmation-list.module').then(
                (m) => m.RegisterConfirmationListModule,
              ),
          },
          {
            path: appRoutes.registerConfirmation.details,
            canLoad: [RegisterConfirmationDetailsGuard],
            loadChildren: () =>
              import('./register-confirmation-details/register-confirmation-details.module').then(
                (m) => m.RegisterConfirmationDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RegisterConfirmationRoutingModule {}
