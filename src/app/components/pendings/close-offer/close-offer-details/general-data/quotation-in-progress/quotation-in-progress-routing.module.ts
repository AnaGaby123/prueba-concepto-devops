import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuotationInProgressComponent} from '@appComponents/pendings/close-offer/close-offer-details/general-data/quotation-in-progress/quotation-in-progress.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: QuotationInProgressComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class QuotationInProgressRoutingModule {}
