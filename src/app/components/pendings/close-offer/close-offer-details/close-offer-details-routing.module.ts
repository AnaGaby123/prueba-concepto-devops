import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CloseOfferDetailsComponent} from '@appComponents/pendings/close-offer/close-offer-details/close-offer-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CloseOfferDetailsComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.closeOffer.generalData,
            pathMatch: 'full',
          },
          {
            path: appRoutes.closeOffer.generalData,
            loadChildren: () =>
              import('./general-data/general-data.module').then((m) => m.GeneralDataModule),
          },
          {
            path: appRoutes.closeOffer.resume,
            loadChildren: () => import('./resume/resume.module').then((m) => m.ResumeModule),
            // canLoad: [CloseOfferResumeGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CloseOfferDetailsRoutingModule {}
