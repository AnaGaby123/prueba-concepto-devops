import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SecurityGuardComponent} from '@appComponents/pendings/storer/security-guard/security-guard.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: SecurityGuardComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.securityGuard.details,
            pathMatch: 'full',
          },
          {
            path: appRoutes.securityGuard.details,
            loadChildren: () =>
              import('./security-guard-details/security-guard-details.module').then(
                (m) => m.SecurityGuardDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SecurityGuardRoutingModule {}
