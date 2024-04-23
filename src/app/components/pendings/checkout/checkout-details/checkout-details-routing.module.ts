import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CheckoutDetailsComponent} from '@appComponents/pendings/checkout/checkout-details/checkout-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CheckoutDetailsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.checkout.processing,
            pathMatch: 'full',
          },
          {
            path: appRoutes.checkout.processing,
            loadChildren: () =>
              import('./processing/processing.module').then((m) => m.ProcessingModule),
          },
          {
            path: appRoutes.checkout.resume,
            loadChildren: () => import('./resume/resume.module').then((m) => m.ResumeModule),
            // canLoad: [CloseOfferResumeGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CheckoutDetailsRoutingModule {}
