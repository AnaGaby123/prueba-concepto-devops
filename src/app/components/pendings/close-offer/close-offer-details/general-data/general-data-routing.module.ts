import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GeneralDataComponent} from '@appComponents/pendings/close-offer/close-offer-details/general-data/general-data.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: GeneralDataComponent,
        children: [
          {
            path: appRoutes.closeOffer.generalDataNew,
            loadChildren: () =>
              import('./quotation-new/quotation-new.module').then((m) => m.QuotationNewModule),
          },
          {
            path: appRoutes.closeOffer.generalDataInProgress,
            loadChildren: () =>
              import('./quotation-in-progress/quotation-in-progress.module').then(
                (m) => m.QuotationInProgressModule,
              ),
          },
          {
            path: appRoutes.closeOffer.generalDataAdjustment,
            loadChildren: () =>
              import('./quotation-adjustment/quotation-adjustment.module').then(
                (m) => m.QuotationAdjustmentModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class GeneralDataRoutingModule {}
